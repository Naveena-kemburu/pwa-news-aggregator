'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Unregister old service worker first
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });

      // Register new service worker
      setTimeout(() => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration);
            
            // Check for updates
            registration.update();
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      }, 100);
    }
  }, []);

  return null;
}
