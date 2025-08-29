import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AdminUsersFilters, FiltersState } from './filters.types';
import { USERS_FILTERS_DEFAULTS } from '../../../constants/defaults';

const initialState: FiltersState = {
  public: undefined,
  admin: {
    users: USERS_FILTERS_DEFAULTS,
    comments: undefined,
    articles: undefined,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setUsersFilters(state, action: PayloadAction<Partial<AdminUsersFilters>>) {
      const prev = state.admin.users;
      const next = { ...prev, ...action.payload };

      const filterKeys: (keyof AdminUsersFilters)[] = [
        'role',
        'verified',
        'username',
        'email',
        'sort',
        'hasAvatar',
      ];

      const filtersChanged = filterKeys.some(
        (key) =>
          action.payload[key] !== undefined && action.payload[key] !== prev[key]
      );

      state.admin.users = {
        ...next,
        startIndex: filtersChanged ? 0 : next.startIndex,
      };
    },

    resetUsersFilters(state) {
      state.admin.users = initialState.admin.users;
    },
  },
});

export const { setUsersFilters, resetUsersFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
