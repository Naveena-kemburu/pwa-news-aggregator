import { Article } from './db';

const API_BASE_URL = process.env.NEXT_PUBLIC_NEWS_API_BASE_URL || 'https://newsapi.org/v2';
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export async function getTopHeadlines(category?: string): Promise<Article[]> {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY || '',
      country: 'us',
      pageSize: '20',
    });

    if (category) {
      params.append('category', category);
    }

    const response = await fetch(`${API_BASE_URL}/top-headlines?${params}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: NewsApiResponse = await response.json();
    return data.articles.map((article, index) => ({
      ...article,
      id: article.url || `article-${index}`,
    }));
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    return [];
  }
}

export async function searchArticles(query: string): Promise<Article[]> {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY || '',
      q: query,
      pageSize: '20',
      sortBy: 'publishedAt',
    });

    const response = await fetch(`${API_BASE_URL}/everything?${params}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: NewsApiResponse = await response.json();
    return data.articles.map((article, index) => ({
      ...article,
      id: article.url || `article-${index}`,
    }));
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
}

export const CATEGORIES = [
  'general',
  'business',
  'technology',
  'entertainment',
  'health',
  'science',
  'sports',
];
