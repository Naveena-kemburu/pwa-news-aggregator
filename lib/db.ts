import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
}

interface NewsDB extends DBSchema {
  bookmarks: {
    key: string;
    value: Article;
  };
}

const DB_NAME = 'news-pwa-db';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<NewsDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<NewsDB>> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDB<NewsDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('bookmarks')) {
        db.createObjectStore('bookmarks', { keyPath: 'id' });
      }
    },
  });

  return dbInstance;
}

export async function addBookmark(article: Article): Promise<void> {
  const db = await getDB();
  await db.put('bookmarks', article);
}

export async function removeBookmark(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('bookmarks', id);
}

export async function getAllBookmarks(): Promise<Article[]> {
  const db = await getDB();
  return db.getAll('bookmarks');
}

export async function isBookmarked(id: string): Promise<boolean> {
  const db = await getDB();
  const bookmark = await db.get('bookmarks', id);
  return !!bookmark;
}

export type { Article };
