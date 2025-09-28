import type { LikeableEntity } from '../../../types/api';

export interface Article extends LikeableEntity {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  categories: string[];
  images: string[];
  author: string;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  _v: number;
}

export interface AllArticlesResponse {
  articles: Article[];
  popularArticle: Article[];
  totalArticles: number;
}

export interface ArticleLikeResponse {
  likedEntityId: string; // id статьи
  userId: string;
  likesCount: number;
  liked: boolean;
}

export interface FetchUsersRequestParams {
  role: 'user' | 'admin' | '';
  verified: boolean;
  username: string;
  email: string;
  sort: 'desc' | 'asc';
  startIndex: number;
  limit: number;
  hasAvatar: boolean;
}

export interface FetchArticlesRequestParams {
  start: number;
  limit: number;
  search: string;
  category: string[];
  user: string;
  sortBy: string;
  order: 'desc' | 'asc';
}
