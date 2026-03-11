import { useState, useEffect } from 'react';
import { Article, addBookmark, removeBookmark, getAllBookmarks, isBookmarked } from '@/lib/db';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const allBookmarks = await getAllBookmarks();
      setBookmarks(allBookmarks);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (article: Article) => {
    try {
      const bookmarked = await isBookmarked(article.id);
      
      if (bookmarked) {
        await removeBookmark(article.id);
      } else {
        await addBookmark(article);
        
        // Register background sync if available and service worker is ready
        if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
          try {
            const registration = await navigator.serviceWorker.ready;
            if (registration.active) {
              await registration.sync.register('sync-new-bookmarks');
              console.log('[Sync] Background sync registered');
            }
          } catch (syncError) {
            console.log('[Sync] Background sync not available:', syncError);
            // Bookmarking still works, just without background sync
          }
        }
      }
      
      await loadBookmarks();
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const checkIsBookmarked = async (id: string): Promise<boolean> => {
    return await isBookmarked(id);
  };

  return {
    bookmarks,
    loading,
    toggleBookmark,
    checkIsBookmarked,
    refreshBookmarks: loadBookmarks,
  };
}
