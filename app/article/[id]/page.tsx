'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, isBookmarked } from '@/lib/db';
import { useBookmarks } from '@/hooks/useBookmarks';
import WebShareButton from '@/components/WebShareButton';
import Link from 'next/link';

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = decodeURIComponent(params.id as string);
  const [article, setArticle] = useState<Article | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toggleBookmark, bookmarks } = useBookmarks();

  useEffect(() => {
    loadArticle();
  }, [articleId, bookmarks]);

  const loadArticle = async () => {
    setLoading(true);
    
    // Try to get from sessionStorage first (when navigating from article list)
    const storedArticle = sessionStorage.getItem(`article_${articleId}`);
    if (storedArticle) {
      try {
        const parsedArticle = JSON.parse(storedArticle);
        setArticle(parsedArticle);
      } catch (error) {
        console.error('Error parsing stored article:', error);
      }
    }
    
    // If not in sessionStorage, try to find in bookmarks
    if (!storedArticle) {
      const bookmarkedArticle = bookmarks.find((a) => a.id === articleId);
      if (bookmarkedArticle) {
        setArticle(bookmarkedArticle);
      }
    }
    
    const status = await isBookmarked(articleId);
    setBookmarked(status);
    setLoading(false);
  };

  const handleBookmark = async () => {
    if (article) {
      await toggleBookmark(article);
      const status = await isBookmarked(articleId);
      setBookmarked(status);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="mb-6">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-8">
            This article is not in your bookmarks. To view article details, please click on an article from the home page or category pages.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Go to Home Page
            </Link>
            <Link
              href="/bookmarks"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              View Bookmarks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-96 object-cover"
          />
        )}
        
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center justify-between mb-6 text-gray-600">
            <div>
              <p className="font-semibold">{article.source.name}</p>
              {article.author && <p className="text-sm">By {article.author}</p>}
            </div>
            <p className="text-sm">
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={handleBookmark}
              data-testid="bookmark-button"
              className={`flex-1 py-3 rounded-lg font-semibold ${
                bookmarked
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {bookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
            
            <WebShareButton
              title={article.title}
              text={article.description || ''}
              url={article.url}
            />
          </div>

          <div className="prose max-w-none">
            <p className="text-xl text-gray-700 mb-6">{article.description}</p>
            <p className="text-gray-800 whitespace-pre-line">{article.content}</p>
          </div>

          <div className="mt-8 pt-6 border-t">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Read full article on {article.source.name} →
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
