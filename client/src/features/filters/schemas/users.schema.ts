import type { ParamSchema } from '../../../types/urlParsing';
import type {
  AdminUsersFilters,
  AdminArticlesFilters,
} from '../slices/filters.types';

export const userSchema: ParamSchema<AdminUsersFilters> = {
  role: 'string',
  verified: 'boolean',
  username: 'string',
  email: 'string',
  sort: 'string',
  startIndex: 'number',
  hasAvatar: 'boolean',
  limit: 'number',
};

export const articleSchema: ParamSchema<AdminArticlesFilters> = {
  search: 'string',
  user: 'string',
  category: 'string',
  sortByLikes: 'string',
  sortByPublishing: 'string',
  sortByViews: 'string',
  startIndex: 'number',
  limit: 'number',
};
