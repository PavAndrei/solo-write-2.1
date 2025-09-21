import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  AdminUsersFilters,
  AdminArticlesFilters,
  FiltersState,
} from './filters.types';
import {
  ARTICLES_FILTERS_DEFAULTS,
  USERS_FILTERS_DEFAULTS,
} from '../../../constants/defaults';

const initialState: FiltersState = {
  public: undefined,
  admin: {
    users: USERS_FILTERS_DEFAULTS,
    comments: undefined,
    articles: ARTICLES_FILTERS_DEFAULTS,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Users filters
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
      state.admin.users = USERS_FILTERS_DEFAULTS;
    },

    // Articles filters
    setArticlesFilters(
      state,
      action: PayloadAction<Partial<AdminArticlesFilters>>
    ) {
      const prev = state.admin.articles;
      const next = { ...prev, ...action.payload };

      const filterKeys: (keyof AdminArticlesFilters)[] = [
        'search',
        'category',
        'user',
        'sortByLikes',
        'sortByViews',
        'sortByPublishing',
      ];

      const filtersChanged = filterKeys.some(
        (key) =>
          action.payload[key] !== undefined && action.payload[key] !== prev[key]
      );

      state.admin.articles = {
        ...next,
        startIndex: filtersChanged ? 0 : next.startIndex,
      };
    },

    resetArticlesFilters(state) {
      state.admin.articles = ARTICLES_FILTERS_DEFAULTS;
    },
  },
});

export const {
  setUsersFilters,
  resetUsersFilters,
  setArticlesFilters,
  resetArticlesFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
