# Deploying Craft CMS to Render.com

This guide explains how to deploy your Craft CMS backend to Render.com using Docker.

## Files Created

- `Dockerfile` - Multi-stage Docker build for Craft CMS with PHP 8.2 + Nginx
- `.render/nginx.conf` - Nginx configuration optimized for Craft CMS
- `.render/supervisord.conf` - Process manager for nginx + php-fpm
- `.render/start.sh` - Startup script that handles environment variables

## Deployment Steps

### 1. Create a Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your Git repository
4. Configure the service:
   - **Name**: `craft-cms-backend` (or your preferred name)
   - **Runtime**: Docker
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Instance Type**: Choose based on your needs (Starter is fine for testing)

### 2. Set Environment Variables

In your Render service settings, add these environment variables:

#### Required Variables

```bash
# Application
CRAFT_ENVIRONMENT=production
CRAFT_SECURITY_KEY=your_32_character_security_key_here

# Database (use Render PostgreSQL add-on or external DB)
DB_DRIVER=pgsql
DB_SERVER=your_postgres_host
DB_PORT=5432
DB_DATABASE=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_SCHEMA=public
DB_TABLE_PREFIX=craft_

# Site URL
PRIMARY_SITE_URL=https://yourapp.onrender.com
```

#### Optional Variables

```bash
# Preview URL (for your Astro frontend)
PREVIEW_URL=https://your-frontend-url.com

# Mail settings
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USERNAME=your_smtp_username
SMTP_PASSWORD=your_smtp_password

# File storage (if using AWS S3)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your-bucket-name
```

### 3. Database Setup

#### Option 1: Render PostgreSQL (Recommended)
1. Add a PostgreSQL add-on to your service
2. Use the provided connection details in your environment variables

#### Option 2: External Database
- Use any PostgreSQL or MySQL database
- Update the DB_* environment variables accordingly

### 3. Deploy

1. Push your code to your Git repository
2. Render will automatically build and deploy your container
3. Monitor the build logs for any issues

### 4. Initial Setup

After successful deployment:

1. Access your Craft CMS admin at: `https://yourapp.onrender.com/admin`
2. Complete the Craft CMS installation wizard
3. Configure your sections, fields, and content structure

## Health Check

The nginx configuration includes a health check endpoint at `/health` that Render can use to verify your application is running.

## File Uploads

For production use, consider configuring AWS S3 or another cloud storage service for file uploads, as Render's file system is not persistent.

## Troubleshooting

### Build Issues
- Check the build logs in Render dashboard
- Ensure all required files are committed to your repository

### Runtime Issues
- Check the service logs in Render dashboard
- Verify all environment variables are set correctly
- Ensure database connection is working

### Common Problems

1. **502 Bad Gateway**: Usually indicates php-fpm is not running or nginx can't connect to it
2. **Database Connection Failed**: Check DB credentials and network access
3. **File Permission Issues**: The Dockerfile sets correct permissions, but check logs if issues persist

## Security Notes

- Never commit sensitive environment variables to your repository
- Use strong, unique security keys
- Enable HTTPS (Render provides this automatically)
- Consider enabling rate limiting and other security headers (already configured in nginx)

## Performance Tips

- Use Redis for sessions and caching (configure via environment variables)
- Enable OPcache (already configured in Dockerfile)
- Configure proper caching headers (already done in nginx config)
- Consider using a CDN for static assets
