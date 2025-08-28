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

# Start supervisord which manages nginx and php-fpm
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
