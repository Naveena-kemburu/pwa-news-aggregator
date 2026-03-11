'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTopHeadlines } from '@/lib/newsApi';
import { Article } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function CategoryPage() {
  const params = useParams();
  const category = params.slug as string;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleBookmark } = useBookmarks();

  useEffect(() => {
    loadArticles();
  }, [category]);

  const loadArticles = async () => {
    setLoading(true);
    const data = await getTopHeadlines(category);
    setArticles(data);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 capitalize">{category} News</h1>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          No articles available in this category.
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
