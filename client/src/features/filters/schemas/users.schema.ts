import type { ParamSchema } from '../../../types/urlParsing';
import type { AdminUsersFilters } from '../slices/filters.types';

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
