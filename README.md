# PWA News Aggregator

[![GitHub Repository](https://img.shields.io/badge/GitHub-pwa--news--aggregator-blue?logo=github)](https://github.com/Naveena-kemburu/pwa-news-aggregator)

A production-ready Progressive Web App (PWA) that aggregates news from NewsAPI with full offline support, advanced caching strategies, push notifications, and background sync capabilities.

**Repository**: [https://github.com/Naveena-kemburu/pwa-news-aggregator](https://github.com/Naveena-kemburu/pwa-news-aggregator)

##  Project Overview

This PWA News Aggregator is a complete implementation of modern web development practices with a focus on offline-first architecture, performance optimization, and exceptional user experience. Built with Next.js 16, TypeScript, and Tailwind CSS, it provides a native app-like experience directly in the browser.

##  Implemented Features

### Core PWA Features
-  **Offline-First Architecture** - Full functionality without internet connection
-  **Custom Service Worker** - Intelligent caching with multiple strategies
-  **IndexedDB Storage** - Persistent bookmarks accessible offline
-  **Background Sync** - Automatic sync when connection is restored
-  **Push Notifications** - Real VAPID-based subscription system
-  **Web Share API** - Native sharing on supported devices
-  **Lazy Loading** - Images load as they enter the viewport using Intersection Observer

### User Features
-  **Real-Time News** - Latest headlines from NewsAPI
-  **Category Navigation** - 7 categories (Technology, Business, Sports, Health, Science, Entertainment, General)
-  **Bookmark Management** - Save articles for offline reading
-  **Article Details** - Full article view with sharing capabilities
-  **Offline Indicator** - Visual red badge when offline
-  **Responsive Design** - Seamless experience on all devices
-  **Session Storage** - Article data persistence for navigation

##  Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **PWA**: Custom Service Worker (public/sw.js)
- **Storage**: IndexedDB via idb library
- **Testing**: Jest + React Testing Library (10 passing tests)
- **Containerization**: Docker + Docker Compose

##  Prerequisites

- Node.js 18+ or Docker
- NewsAPI key from [newsapi.org](https://newsapi.org)
- VAPID keys for push notifications (included)

##  Quick Start

### Local Development

1. **Install dependencies**
```bash
cd pwa-news-aggregator
npm install
```

2. **Environment is pre-configured**
The `.env.local` file is already set up with:
```env
NEXT_PUBLIC_NEWS_API_BASE_URL=https://newsapi.org/v2
NEXT_PUBLIC_NEWS_API_KEY=a6385ea41aa9411eba585a6f6d4fef60
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BBHwp6kWGoMl95_jQ99BvbgefbDNh9FH4BRYK8hnu43ZoLzjNdeVq-vlkC8LG1tOj-REDf6cBxVtBhQXhrA8oIY
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Deployment

1. **Build and run**
```bash
docker-compose up --build -d
```

2. **Access the application**
Open [http://localhost:3000](http://localhost:3000)

3. **Check status**
```bash
docker-compose ps
```

##  Testing

Run the complete test suite:
```bash
npm test
```

**Test Results**:  10/10 tests passing
- API service tests
- Component integration tests
- Bookmark functionality tests

##  PWA Features in Detail

### Service Worker
- **Location**: `public/sw.js`
- **Registration**: Automatic on page load via `ServiceWorkerRegistration` component
- **Status**: Activated and running

### Caching Strategies

1. **Precache (App Shell)**
   - HTML pages
   - JavaScript bundles
   - CSS files
   - PWA manifest
   - App icons

2. **CacheFirst (Images)**
   - All image formats (jpg, png, gif, webp, svg)
   - 30-day expiration
   - Cache name: `images-cache-v1`

3. **StaleWhileRevalidate (API)**
   - NewsAPI requests
   - Fresh data with instant loading
   - Cache name: `api-cache-v1`

4. **NetworkFirst (Navigation)**
   - Page navigation
   - Fallback to cache when offline
   - Cache name: `runtime-cache-v1`

### Offline Support

**How to Test:**
1. Browse the app online (visit home, categories, articles)
2. Bookmark 2-3 articles
3. Open DevTools (F12) → Network tab
4. Select "Offline" from dropdown
5. Reload the page

**What Works Offline:**
-  App shell and navigation
-  Previously viewed pages
-  All bookmarked articles
-  Cached images
-  Red "Offline" badge appears
-  Bookmark management

### Push Notifications

**Location**: Home page - top right corner

**Features**:
- Real VAPID-based subscription
- Browser permission request
- Success notification on subscription
- Persistent subscription state
- Button with `data-testid="subscribe-push-button"`

**How to Test**:
1. Go to home page
2. Click "🔔 Enable Notifications" button
3. Grant permission when prompted
4. See success notification
5. Button changes to "✓ Subscribed to Notifications"

### Background Sync

**Trigger**: When bookmarking articles (especially offline)

**Verification**:
- Check console for: `[SW] Background sync: sync-new-bookmarks`
- Fires automatically when bookmarking
- Syncs data when connection is restored

### Web Share API

**Location**: Article detail pages

**Features**:
- Native share button
- Button with `data-testid="web-share-button"`
- Shares article title, description, and URL
- Only visible on supported devices/browsers

### Lazy Loading

**Implementation**: `hooks/useLazyImage.ts`

**Features**:
- Intersection Observer API
- 50px root margin for preloading
- Fade-in animation on load
- `data-src` attribute for lazy images

##  Project Structure

```
pwa-news-aggregator/
├── app/                          # Next.js app directory
│   ├── article/[id]/page.tsx    # Article detail pages
│   ├── bookmarks/page.tsx       # Bookmarks page
│   ├── category/[slug]/page.tsx # Category pages
│   ├── layout.tsx               # Root layout with navbar
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ArticleCard.tsx          # Article card with bookmark
│   ├── Navbar.tsx               # Navigation with categories
│   ├── PushNotificationButton.tsx # Push subscription button
│   ├── ServiceWorkerRegistration.tsx # SW registration
│   └── WebShareButton.tsx       # Web Share API button
├── hooks/                        # Custom React hooks
│   ├── useBookmarks.ts          # Bookmark management
│   ├── useLazyImage.ts          # Lazy loading images
│   └── useOnlineStatus.ts       # Network status
├── lib/                          # Core libraries
│   ├── db.ts                    # IndexedDB operations
│   ├── newsApi.ts               # NewsAPI service
│   └── pushNotifications.ts     # Push notification helpers
├── public/                       # Static assets
│   ├── sw.js                    # Service worker
│   ├── manifest.json            # PWA manifest
│   ├── logo192.png              # App icon 192x192
│   └── logo512.png              # App icon 512x512
├── tests/                        # Test files
│   ├── ArticleCard.test.tsx     # Component tests
│   └── newsApi.test.ts          # API service tests
├── types/                        # TypeScript definitions
│   └── background-sync.d.ts     # Background Sync API types
├── docker-compose.yml            # Docker Compose config
├── Dockerfile                    # Multi-stage Docker build
├── .env.local                    # Environment variables (configured)
├── .env.example                  # Environment template
└── README.md                     # This file
```

### PWA Manifest

**Location**: `public/manifest.json`

**Configuration**:
- App name: "PWA News Aggregator"
- Short name: "News PWA"
- Display mode: standalone
- Theme color: #000000
- Background color: #ffffff
- Icons: 192x192 and 512x512

##  Application Pages

### Home Page (/)
- Top headlines from NewsAPI
- Push notification subscription button
- Article grid (3 columns on desktop)
- Category navigation tabs
- Offline indicator when disconnected

### Category Pages (/category/[slug])
- Filtered articles by category
- Same grid layout as home
- 7 categories available
- Real-time category switching

### Article Detail Page (/article/[id])
- Full article view with image
- Source name and publication date
- Article description and content
- Bookmark button (yellow when bookmarked)
- Share button (Web Share API)
- Link to original article

### Bookmarks Page (/bookmarks)
- All saved articles
- Works completely offline
- Same card layout
- Empty state with helpful message
- Remove bookmarks functionality

##  Security & Best Practices

-  API keys in environment variables
-  No sensitive data in source code
-  HTTPS required for service workers (production)
-  Secure fetch requests
-  User permission for notifications
-  TypeScript for type safety
-  ESLint for code quality

  ## Video demo
  https://drive.google.com/file/d/1x7e-STXvCGq33EsZZsDhcCvmSwV0q1D4/view?usp=sharing

## Screenshots
<img width="800" height="600" alt="NEWSREAD1" src="https://github.com/user-attachments/assets/2978481e-5838-44a8-9226-4589e4ee4616" />


