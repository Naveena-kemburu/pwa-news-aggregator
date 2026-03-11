'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import ArticleCard from '@/components/ArticleCard';

export default function BookmarksPage() {
  const { bookmarks, loading, toggleBookmark } = useBookmarks();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Bookmarked Articles</h1>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No bookmarks yet</p>
          <p className="text-gray-500">
            Start bookmarking articles to read them offline!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onBookmark={toggleBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
}
