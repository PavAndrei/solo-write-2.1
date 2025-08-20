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
      limit: 12,
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
      state.admin.users = { ...state.admin.users, ...action.payload };
    },
    resetUsersFilters(state) {
      state.admin.users = initialState.admin.users;
    },
  },
});

export const { setUsersFilters, resetUsersFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
