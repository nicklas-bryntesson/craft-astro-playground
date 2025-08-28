#!/bin/sh

# Set default PORT if not provided by Render.com
export PORT=${PORT:-10000}

echo "Starting Craft CMS on Render.com..."
echo "PORT: $PORT"

# Substitute environment variables in nginx config
envsubst '$PORT' < /etc/nginx/nginx.conf > /tmp/nginx.conf
mv /tmp/nginx.conf /etc/nginx/nginx.conf

# Test nginx configuration
nginx -t

# Install Craft CMS if not already installed
echo "Checking if Craft CMS is installed..."
cd /var/www/html
if ! php craft install/check > /dev/null 2>&1; then
    echo "Installing Craft CMS..."
    
    # Use environment variables or defaults
    ADMIN_EMAIL=${CRAFT_ADMIN_EMAIL:-admin@example.com}
    ADMIN_USERNAME=${CRAFT_ADMIN_USERNAME:-admin}
    ADMIN_PASSWORD=${CRAFT_ADMIN_PASSWORD:-ChangeMe123!}
    SITE_NAME=${CRAFT_SITE_NAME:-Craft CMS}
    
    php craft install \
        --interactive=0 \
        --email="$ADMIN_EMAIL" \
        --username="$ADMIN_USERNAME" \
        --password="$ADMIN_PASSWORD" \
        --siteName="$SITE_NAME" \
        --siteUrl="$CRAFT_BASE_CP_URL" \
        --language=en-US
    echo "Craft CMS installation completed!"
    echo "Admin user: $ADMIN_USERNAME"
    echo "Admin email: $ADMIN_EMAIL" 
    echo "Please change the password after first login!"
else
    echo "Craft CMS is already installed."
fi

# Run any pending migrations
echo "Running Craft migrations..."
php craft migrate/all --interactive=0

# Apply project config
echo "Applying project config..."
php craft project-config/apply --force

# Start supervisord which manages nginx and php-fpm
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
