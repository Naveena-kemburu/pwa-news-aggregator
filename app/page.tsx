'use client';

import { useEffect, useState } from 'react';
import { getTopHeadlines } from '@/lib/newsApi';
import { Article } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import PushNotificationButton from '@/components/PushNotificationButton';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleBookmark } = useBookmarks();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    const data = await getTopHeadlines();
    setArticles(data);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Top Headlines</h1>
        <PushNotificationButton />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          No articles available. Check your internet connection or API key.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
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
