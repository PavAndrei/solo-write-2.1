import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FetchUsersRequestParams } from '../../users/types/users.types';
import type { FiltersState } from './filters.types';

const initialState: FiltersState = {
  public: undefined,
  admin: {
    users: {
      role: '',
      verified: false,
      username: '',
      email: '',
      sort: 'desc',
      startIndex: 0,
      limit: 10,
      hasAvatar: false,
    },
    comments: undefined,
    articles: undefined,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setUsersFilters(
      state,
      action: PayloadAction<Partial<FetchUsersRequestParams>>
    ) {
      const prev = state.admin.users;
      const next = { ...prev, ...action.payload };

      const filterKeys: (keyof FetchUsersRequestParams)[] = [
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
