export interface Article {
  categories: string[];
  content: string;
  createdAt: string;
  description: string;
  images: string[];
  likedBy?: string[];
  likesCount: number;
  slug: string;
  title: string;
  updatedAt: string;
  author: string;
  viewsCount: number;
  _v: number;
  _id: string;
}

export interface AllArticlesResponse {
  articles: Article[];
  popularArticle: Article[];
  totalArticles: number;
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
