import { getTopHeadlines, searchArticles, CATEGORIES } from '@/lib/newsApi';

global.fetch = jest.fn();

describe('News API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTopHeadlines', () => {
    it('should fetch top headlines successfully', async () => {
      const mockArticles = [
        {
          title: 'Test Article',
          description: 'Test Description',
          url: 'https://test.com/article',
          urlToImage: 'https://test.com/image.jpg',
          publishedAt: '2024-01-01T00:00:00Z',
          source: { id: 'test', name: 'Test Source' },
          author: 'Test Author',
          content: 'Test content',
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: 'ok',
          totalResults: 1,
          articles: mockArticles,
        }),
      });

      const articles = await getTopHeadlines();
      
      expect(articles).toHaveLength(1);
      expect(articles[0].title).toBe('Test Article');
      expect(articles[0].id).toBe('https://test.com/article');
    });

    it('should handle API errors gracefully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const articles = await getTopHeadlines();
      
      expect(articles).toEqual([]);
    });

    it('should fetch articles for a specific category', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: 'ok',
          totalResults: 0,
          articles: [],
        }),
      });

      await getTopHeadlines('technology');
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('category=technology')
      );
    });
  });

  describe('searchArticles', () => {
    it('should search articles successfully', async () => {
      const mockArticles = [
        {
          title: 'Search Result',
          description: 'Search Description',
          url: 'https://test.com/search',
          urlToImage: 'https://test.com/search.jpg',
          publishedAt: '2024-01-01T00:00:00Z',
          source: { id: 'test', name: 'Test Source' },
          author: 'Test Author',
          content: 'Search content',
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: 'ok',
          totalResults: 1,
          articles: mockArticles,
        }),
      });

      const articles = await searchArticles('test query');
      
      expect(articles).toHaveLength(1);
      expect(articles[0].title).toBe('Search Result');
    });
  });

  describe('CATEGORIES', () => {
    it('should export valid categories', () => {
      expect(CATEGORIES).toContain('general');
      expect(CATEGORIES).toContain('business');
      expect(CATEGORIES).toContain('technology');
      expect(CATEGORIES.length).toBeGreaterThan(0);
    });
  });
});
