export interface AdminUsersFilters {
  role: 'user' | 'admin' | '';
  verified: boolean;
  username: string;
  email: string;
  sort: 'desc' | 'asc';
  startIndex: number;
  limit: number;
  hasAvatar: boolean;
}

export interface AdminArticlesFilters {
  search: string;
  category: string;
  user: string;
  sortBy: string;
  sort: 'desc' | 'asc';
  limit: number;
  startIndex: number;
}

interface AdminFilters {
  users: AdminUsersFilters;
  comments: undefined;
  articles: AdminArticlesFilters;
}

export interface FiltersState {
  public: undefined;
  admin: AdminFilters;
}
