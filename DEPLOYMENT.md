# Deployment Guide

## Prerequisites

- Node.js 18+ or Docker
- NewsAPI key from [newsapi.org](https://newsapi.org)
- (Optional) VAPID keys for push notifications

## Getting a NewsAPI Key

1. Visit [newsapi.org](https://newsapi.org)
2. Click "Get API Key"
3. Sign up for a free account
4. Copy your API key from the dashboard
5. Free tier includes 100 requests per day

## Local Development Setup

### Step 1: Install Dependencies

```bash
cd pwa-news-aggregator
npm install
```

### Step 2: Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_NEWS_API_BASE_URL=https://newsapi.org/v2
NEXT_PUBLIC_NEWS_API_KEY=a6385ea41aa9411eba585a6f6d4fef60
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BBHwp6kWGoMl95_jQ99BvbgefbDNh9FH4BRYK8hnu43ZoLzjNdeVq-vlkC8LG1tOj-REDf6cBxVtBhQXhrA8oIY
```

### Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Step 4: Run Tests

```bash
npm test
```

## Production Build

### Build the Application

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Docker Deployment

### Step 1: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your API key:
```env
NEXT_PUBLIC_NEWS_API_KEY=a6385ea41aa9411eba585a6f6d4fef60
```

### Step 2: Build and Run

```bash
docker-compose up --build -d
```

### Step 3: Verify Deployment

Check container status:
```bash
docker-compose ps
```

Expected output:
```
NAME                          STATUS              PORTS
pwa-news-aggregator-webapp-1  Up (healthy)        0.0.0.0:3000->3000/tcp
```

View logs:
```bash
docker-compose logs -f webapp
```

### Step 4: Access Application

Open [http://localhost:3000](http://localhost:3000)

### Stop Application

```bash
docker-compose down
```

## Cloud Deployment

### Vercel (Recommended for Next.js)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Set Environment Variables**
```bash
vercel env add NEXT_PUBLIC_NEWS_API_KEY
```

5. **Deploy to Production**
```bash
vercel --prod
```

### Docker on Cloud Platforms

#### AWS ECS

1. Build and push image:
```bash
docker build -t pwa-news-aggregator .
docker tag pwa-news-aggregator:latest <aws-account-id>.dkr.ecr.<region>.amazonaws.com/pwa-news-aggregator:latest
docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/pwa-news-aggregator:latest
```

2. Create ECS task definition with environment variables
3. Create ECS service
4. Configure load balancer

#### Google Cloud Run

1. Build and push:
```bash
gcloud builds submit --tag gcr.io/<project-id>/pwa-news-aggregator
```

2. Deploy:
```bash
gcloud run deploy pwa-news-aggregator \
  --image gcr.io/<project-id>/pwa-news-aggregator \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NEXT_PUBLIC_NEWS_API_KEY=your_key
```

#### Azure Container Instances

1. Build and push:
```bash
az acr build --registry <registry-name> --image pwa-news-aggregator .
```

2. Deploy:
```bash
az container create \
  --resource-group <resource-group> \
  --name pwa-news-aggregator \
  --image <registry-name>.azurecr.io/pwa-news-aggregator \
  --dns-name-label pwa-news-aggregator \
  --ports 3000 \
  --environment-variables NEXT_PUBLIC_NEWS_API_KEY=your_key
```

## Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_NEWS_API_KEY` | NewsAPI key | `abc123...` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_NEWS_API_BASE_URL` | API base URL | `https://newsapi.org/v2` |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | VAPID public key for push | - |

## HTTPS Configuration

Service workers require HTTPS in production. Options:

### 1. Use a Reverse Proxy (Nginx)

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Use Cloudflare

1. Add your domain to Cloudflare
2. Enable "Always Use HTTPS"
3. Point DNS to your server
4. Cloudflare handles SSL automatically

### 3. Use Let's Encrypt

```bash
# Install certbot
sudo apt-get install certbot

# Get certificate
sudo certbot certonly --standalone -d your-domain.com

# Configure your web server with the certificate
```

## Performance Optimization

### 1. Enable Compression

In Nginx:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### 2. Set Cache Headers

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Use CDN

- Cloudflare
- AWS CloudFront
- Google Cloud CDN
- Azure CDN

## Monitoring

### Health Check Endpoint

The Docker container includes a health check:
```bash
curl http://localhost:3000
```

### Logging

View Docker logs:
```bash
docker-compose logs -f webapp
```

View Next.js logs:
```bash
npm start 2>&1 | tee app.log
```

### Monitoring Tools

- **Uptime**: UptimeRobot, Pingdom
- **Performance**: Google Analytics, New Relic
- **Errors**: Sentry, Rollbar
- **Logs**: Papertrail, Loggly

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Docker Build Fails

```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Service Worker Not Working

1. Ensure HTTPS is enabled (or using localhost)
2. Check browser console for errors
3. Unregister old service workers:
   - DevTools > Application > Service Workers > Unregister

### API Rate Limit Exceeded

- Free tier: 100 requests/day
- Upgrade to paid plan at newsapi.org
- Implement request caching
- Use StaleWhileRevalidate strategy (already implemented)

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure environment variables
- [ ] Don't commit .env files
- [ ] Use secrets management (AWS Secrets Manager, etc.)
- [ ] Enable CORS properly
- [ ] Set security headers
- [ ] Keep dependencies updated
- [ ] Use Docker security scanning

## Backup and Recovery

### Backup User Data

IndexedDB data is stored client-side. For server-side backup:

1. Implement backend API
2. Sync bookmarks to server
3. Regular database backups

### Disaster Recovery

1. Keep Docker images in registry
2. Store environment variables securely
3. Document deployment process
4. Test recovery procedures

## Scaling

### Horizontal Scaling

1. Use load balancer (Nginx, AWS ALB)
2. Deploy multiple containers
3. Use container orchestration (Kubernetes)

### Vertical Scaling

1. Increase container resources
2. Optimize Next.js build
3. Use caching layers (Redis)

## Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
```

### Update Docker Image

```bash
docker-compose pull
docker-compose up -d
```

### Monitor Performance

```bash
# Run Lighthouse audit
npm install -g lighthouse
lighthouse http://localhost:3000 --output json --output-path ./reports/lighthouse.json
```

## Support

For deployment issues:
1. Check logs: `docker-compose logs`
2. Verify environment variables
3. Test locally first
4. Check firewall/security groups
5. Verify DNS configuration

## Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Docker Documentation](https://docs.docker.com)
- [Vercel Documentation](https://vercel.com/docs)
- [PWA Deployment Guide](https://web.dev/pwa-checklist/)

---

**Need Help?** Check the README.md or open an issue in the repository.
