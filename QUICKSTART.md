# Quick Start Guide

## Prerequisites
- Node.js 18+ or Docker
- NewsAPI key from [newsapi.org](https://newsapi.org)

## Option 1: Local Development (Fastest)

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment**
```bash
cp .env.example .env.local
```

3. **Edit `.env.local` and add your API key**
```env
NEXT_PUBLIC_NEWS_API_KEY=a6385ea41aa9411eba585a6f6d4fef60
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Option 2: Docker (Production-like)

1. **Set up environment**
```bash
cp .env.example .env
```

2. **Edit `.env` and add your API key**
```env
NEXT_PUBLIC_NEWS_API_KEY=a6385ea41aa9411eba585a6f6d4fef60
```

3. **Build and run**
```bash
docker-compose up --build -d
```

4. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

5. **Check status**
```bash
docker-compose ps
```

## Testing PWA Features

### Test Offline Mode
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Check "Offline"
4. Reload page - it should still work!

### Test Service Worker
1. Open DevTools > Application
2. Click "Service Workers"
3. Verify service worker is active

### Test Bookmarks
1. Click bookmark button on any article
2. Go to Bookmarks page
3. Turn off network
4. Bookmarks should still be accessible

### Test Push Notifications
1. Click "Enable Notifications" button
2. Grant permission
3. Check DevTools > Application > Service Workers
4. Verify subscription exists

## Running Tests

```bash
npm test
```

## Building for Production

```bash
npm run build
npm start
```

## Stopping Docker

```bash
docker-compose down
```

## Getting a NewsAPI Key

1. Visit [newsapi.org](https://newsapi.org)
2. Click "Get API Key"
3. Sign up for free account
4. Copy your API key
5. Add to `.env.local` or `.env`

## Troubleshooting

**"API error" messages**
- Check your API key is correct
- Verify you haven't exceeded rate limit (100/day free tier)

**Service worker not working**
- Service workers only work on localhost or HTTPS
- Check DevTools > Application > Service Workers for errors

**Docker build fails**
- Ensure Docker is running
- Check port 3000 is not in use
- Try: `docker-compose down && docker-compose up --build`

## Next Steps

- Read the full [README.md](README.md)
- Check [IMPLEMENTATION.md](IMPLEMENTATION.md) for technical details
- Run Lighthouse audit for performance metrics
- Customize the app for your needs

## Support

For issues or questions:
1. Check the troubleshooting section in README.md
2. Review the implementation details
3. Check browser console for errors
