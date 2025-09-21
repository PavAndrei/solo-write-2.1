import type {
  AdminArticlesFilters,
  AdminUsersFilters,
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
