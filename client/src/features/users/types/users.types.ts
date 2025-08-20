export interface User {
  _id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  role: 'user' | 'admin';
  verified: boolean;
  articles: string[]; // Определить тип Article позже
  createdAt: string;
  updatedAt: string;
  __v: number;
  comments: string[]; // Определить тип Comment позже;
  articlesCount: number;
  commentsCount: number;
}

export interface UserResponseData {
  users: User[];
  total: number;
}

export interface FetchUsersRequestParams {
  role?: 'user' | 'admin' | '';
  verified: boolean;
  username: string;
  email: string;
  sort: 'desc' | 'asc';
  startIndex: number;
  limit: number;
  hasAvatar: boolean;
}
