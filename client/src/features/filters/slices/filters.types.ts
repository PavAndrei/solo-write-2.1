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
  category: string[];
  user: string;
  sortByLikes: 'desc' | 'asc' | '';
  sortByViews: 'desc' | 'asc' | '';
  sortByPublishing: 'desc' | 'asc';
  limit: number;
  startIndex: number;
}

export interface PublicArticlesFilters {
  search: string;
  category: string[];
  user: string;
  sortByLikes: 'desc' | 'asc' | '';
  sortByViews: 'desc' | 'asc' | '';
  sortByPublishing: 'desc' | 'asc';
  limit: number;
  startIndex: number;
}

interface PublicFilters {
  articles: PublicArticlesFilters;
}

interface AdminFilters {
  users: AdminUsersFilters;
  comments: undefined;
  articles: AdminArticlesFilters;
}

export interface FiltersState {
  public: PublicFilters;
  admin: AdminFilters;
}
