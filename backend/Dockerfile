# Multi-stage Dockerfile for Craft CMS on Render.com
# Stage 1: Install Composer dependencies
FROM composer:2 as vendor

COPY composer.json composer.lock ./
RUN composer install \
    --ignore-platform-reqs \
    --no-interaction \
    --no-dev \
    --prefer-dist \
    --optimize-autoloader

# Stage 2: Production image
FROM php:8.2-fpm-alpine

# Install system dependencies and PHP extensions
RUN apk add --no-cache \
    nginx \
    supervisor \
    gettext \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libzip-dev \
    icu-dev \
    imagemagick-dev \
    libxml2-dev \
    oniguruma-dev \
    postgresql-dev \
    mysql-client \
    postgresql-client \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        gd \
        zip \
        intl \
        pdo \
        pdo_mysql \
        pdo_pgsql \
        opcache \
        mbstring \
        xml \
        bcmath \
        exif

# Install ImageMagick extension
RUN apk add --no-cache --virtual .phpize-deps $PHPIZE_DEPS \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
    && apk del .phpize-deps

# Configure PHP for production
RUN { \
        echo 'opcache.memory_consumption=128'; \
        echo 'opcache.interned_strings_buffer=8'; \
        echo 'opcache.max_accelerated_files=4000'; \
        echo 'opcache.revalidate_freq=2'; \
        echo 'opcache.fast_shutdown=1'; \
        echo 'opcache.enable_cli=1'; \
    } > /usr/local/etc/php/conf.d/opcache-recommended.ini

RUN { \
        echo 'memory_limit=512M'; \
        echo 'upload_max_filesize=100M'; \
        echo 'post_max_size=100M'; \
        echo 'max_execution_time=300'; \
        echo 'max_input_time=300'; \
    } > /usr/local/etc/php/conf.d/craft-recommended.ini

# Set working directory
WORKDIR /var/www/html

# Copy Composer dependencies
COPY --from=vendor /app/vendor ./vendor

# Copy application files
COPY . .

# Copy configuration files
COPY .render/nginx.conf /etc/nginx/nginx.conf
COPY .render/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY .render/php-fpm.conf /usr/local/etc/php-fpm.conf
COPY .render/start.sh /start.sh
RUN chmod +x /start.sh

# Create necessary directories and set permissions
RUN mkdir -p /var/www/html/storage/logs \
    && mkdir -p /var/www/html/storage/runtime \
    && mkdir -p /var/www/html/web/cpresources \
    && mkdir -p /var/log/nginx \
    && mkdir -p /var/log/supervisor \
    && mkdir -p /run/nginx \
    && mkdir -p /var/run \
    && touch /var/log/nginx/access.log \
    && touch /var/log/nginx/error.log \
    && touch /var/log/php-fpm.log \
    && touch /var/log/php-fpm-access.log

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/web/cpresources \
    && chown -R www-data:www-data /var/log/nginx \
    && chown www-data:www-data /var/log/php-fpm.log \
    && chown www-data:www-data /var/log/php-fpm-access.log \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/web/cpresources \
    && chmod 666 /var/log/php-fpm.log \
    && chmod 666 /var/log/php-fpm-access.log

# Expose port (Render.com uses PORT environment variable)
EXPOSE ${PORT:-10000}

# Use startup script to handle environment variables and start supervisor
CMD ["/start.sh"]
