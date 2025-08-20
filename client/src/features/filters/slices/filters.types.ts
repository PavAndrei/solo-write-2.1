interface AdminUsersFilters {
  role?: 'user' | 'admin';
  verified: boolean;
  username: string;
  email: string;
  sort: 'desc' | 'asc';
  startIndex: number;
  limit: number;
  hasAvatar: boolean;
}

interface AdminFilters {
  users: AdminUsersFilters;
  comments: undefined;
  articles: undefined;
}

export interface Filters {
  filters: {
    public: undefined;
    admin: AdminFilters;
  };
}
