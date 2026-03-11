import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/lib/db';

// Mock the hooks and db
jest.mock('@/hooks/useLazyImage', () => ({
  useLazyImage: () => ({
    imgRef: { current: null },
    imageSrc: 'https://test.com/image.jpg',
    isLoaded: true,
    handleLoad: jest.fn(),
  }),
}));

jest.mock('@/lib/db', () => ({
  isBookmarked: jest.fn().mockResolvedValue(false),
}));

jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

describe('ArticleCard', () => {
  const mockArticle: Article = {
    id: 'test-article-1',
    title: 'Test Article Title',
    description: 'Test article description',
    content: 'Test article content',
    url: 'https://test.com/article',
    urlToImage: 'https://test.com/image.jpg',
    publishedAt: '2024-01-01T00:00:00Z',
    source: {
      id: 'test-source',
      name: 'Test Source',
    },
    author: 'Test Author',
  };

  const mockOnBookmark = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render article information correctly', () => {
    render(<ArticleCard article={mockArticle} onBookmark={mockOnBookmark} />);

    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.getByText('Test article description')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
  });

  it('should display bookmark button', () => {
    render(<ArticleCard article={mockArticle} onBookmark={mockOnBookmark} />);

    const bookmarkButton = screen.getByTestId('bookmark-button');
    expect(bookmarkButton).toBeInTheDocument();
  });

  it('should call onBookmark when bookmark button is clicked', async () => {
    render(<ArticleCard article={mockArticle} onBookmark={mockOnBookmark} />);

    const bookmarkButton = screen.getByTestId('bookmark-button');
    fireEvent.click(bookmarkButton);

    await waitFor(() => {
      expect(mockOnBookmark).toHaveBeenCalledWith(mockArticle);
    });
  });

  it('should render article image', () => {
    render(<ArticleCard article={mockArticle} onBookmark={mockOnBookmark} />);

    const image = screen.getByAltText('Test Article Title');
    expect(image).toBeInTheDocument();
  });

  it('should format date correctly', () => {
    render(<ArticleCard article={mockArticle} onBookmark={mockOnBookmark} />);

    const dateElement = screen.getByText(/1\/1\/2024/);
    expect(dateElement).toBeInTheDocument();
  });
});
