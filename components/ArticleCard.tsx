'use client';

import Link from 'next/link';
import { Article } from '@/lib/db';
import { useLazyImage } from '@/hooks/useLazyImage';
import { useEffect, useState } from 'react';
import { isBookmarked } from '@/lib/db';
import { useRouter } from 'next/navigation';

interface ArticleCardProps {
  article: Article;
  onBookmark: (article: Article) => void;
}

export default function ArticleCard({ article, onBookmark }: ArticleCardProps) {
  const router = useRouter();
  const { imgRef, imageSrc, isLoaded, handleLoad } = useLazyImage(
    article.urlToImage || '/placeholder.png'
  );
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    checkBookmarkStatus();
  }, [article.id]);

  const checkBookmarkStatus = async () => {
    const status = await isBookmarked(article.id);
    setBookmarked(status);
  };

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await onBookmark(article);
    await checkBookmarkStatus();
  };

  const handleArticleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Store article data in sessionStorage for the detail page
    sessionStorage.setItem(`article_${article.id}`, JSON.stringify(article));
    router.push(`/article/${encodeURIComponent(article.id)}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div onClick={handleArticleClick} className="cursor-pointer">
        <div className="relative h-48 bg-gray-200">
          <img
            ref={imgRef}
            src={imageSrc || undefined}
            data-src={article.urlToImage}
            alt={article.title}
            onLoad={handleLoad}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">
            {article.title}
          </h2>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {article.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{article.source.name}</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <button
          onClick={handleBookmarkClick}
          data-testid="bookmark-button"
          className={`w-full py-2 rounded ${
            bookmarked
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {bookmarked ? '★ Bookmarked' : '☆ Bookmark'}
        </button>
      </div>
    </div>
  );
}
