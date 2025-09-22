import type { ParamSchema } from '../../../types/urlParsing';
import type {
  AdminArticlesFilters,
  AdminUsersFilters,
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
  category: 'string[]',
  limit: 'number',
  search: 'string',
  sortByLikes: 'string',
  sortByPublishing: 'string',
  sortByViews: 'string',
  startIndex: 'number',
  user: 'string',
};
