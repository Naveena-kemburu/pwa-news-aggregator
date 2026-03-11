# Deployment Guide

## Prerequisites

- Node.js 18+ or Docker
- NewsAPI key from [newsapi.org](https://newsapi.org)
- (Optional) VAPID keys for push notifications

## Getting a NewsAPI Key

1. Visit [newsapi.org](https://newsapi.org)
2. Click "Get API Key"
3. Sign up for a free account
4. Copy the API key from the dashboard
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

Edit `.env` with API key:
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
---

**Need Help?** Check the README.md or open an issue in the repository.
