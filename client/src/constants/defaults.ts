import type {
  AdminArticlesFilters,
  AdminUsersFilters,
  PublicArticlesFilters,
} from '../features/filters/slices/filters.types';

export const USERS_FILTERS_DEFAULTS: AdminUsersFilters = {
  role: '',
  verified: false,
  username: '',
  email: '',
  sort: 'desc',
  startIndex: 0,
  limit: 10,
  hasAvatar: false,
};

export const ARTICLES_FILTERS_DEFAULTS: AdminArticlesFilters = {
  search: '',
  category: [],
  user: '',
  sortByLikes: '',
  sortByPublishing: 'desc',
  sortByViews: '',
  limit: 7,
  startIndex: 0,
};

export const ARTICLES_PUBLIC_FILTERS_DEFAULTS: PublicArticlesFilters = {
  search: '',
  category: [],
  user: '',
  sortByLikes: '',
  sortByPublishing: 'desc',
  sortByViews: '',
  limit: 12,
  startIndex: 0,
};
