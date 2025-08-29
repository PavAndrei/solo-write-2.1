import type { AdminUsersFilters } from '../features/filters/slices/filters.types';

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
