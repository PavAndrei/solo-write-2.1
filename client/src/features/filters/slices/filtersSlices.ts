import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  AdminUsersFilters,
  AdminArticlesFilters,
  FiltersState,
  PublicArticlesFilters,
} from './filters.types';
import {
  ARTICLES_FILTERS_DEFAULTS,
  ARTICLES_PUBLIC_FILTERS_DEFAULTS,
  COMMENTS_FILTERS_DEFAULTS,
  USERS_FILTERS_DEFAULTS,
} from '../../../constants/defaults';

const initialState: FiltersState = {
  public: {
    articles: ARTICLES_PUBLIC_FILTERS_DEFAULTS,
  },
  admin: {
    users: USERS_FILTERS_DEFAULTS,
    comments: COMMENTS_FILTERS_DEFAULTS,
    articles: ARTICLES_FILTERS_DEFAULTS,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Users filters
    setUsersFilters(
      state,
      action: PayloadAction<
        Partial<AdminUsersFilters> & { resetStartIndex?: boolean }
      >
    ) {
      const prev = state.admin.users;
      const { resetStartIndex = true, ...payload } = action.payload;
      const next = { ...prev, ...payload };

      const filterKeys: (keyof AdminUsersFilters)[] = [
        'role',
        'verified',
        'username',
        'email',
        'sort',
        'hasAvatar',
      ];

      const filtersChanged = filterKeys.some(
        (key) => payload[key] !== undefined && payload[key] !== prev[key]
      );

      state.admin.users = {
        ...next,
        startIndex: resetStartIndex && filtersChanged ? 0 : next.startIndex,
      };
    },

    resetUsersFilters(state) {
      state.admin.users = USERS_FILTERS_DEFAULTS;
    },

    // Articles filters
    setArticlesFilters(
      state,
      action: PayloadAction<
        Partial<AdminArticlesFilters> & { resetStartIndex?: boolean }
      >
    ) {
      const prev = state.admin.articles;
      const { resetStartIndex = true, ...payload } = action.payload;
      const next = { ...prev, ...payload };

      const filterKeys: (keyof AdminArticlesFilters)[] = [
        'search',
        'category',
        'user',
        'sortByLikes',
        'sortByViews',
        'sortByPublishing',
      ];

      const filtersChanged = filterKeys.some(
        (key) => payload[key] !== undefined && payload[key] !== prev[key]
      );

      state.admin.articles = {
        ...next,
        startIndex: resetStartIndex && filtersChanged ? 0 : next.startIndex,
      };
    },

    setPublicArticlesFilters(
      state,
      action: PayloadAction<
        Partial<PublicArticlesFilters> & { resetStartIndex?: boolean }
      >
    ) {
      const prev = state.public.articles;
      const { resetStartIndex = true, ...payload } = action.payload;
      const next = { ...prev, ...payload };

      const filterKeys: (keyof PublicArticlesFilters)[] = [
        'search',
        'category',
        'user',
        'sortByLikes',
        'sortByViews',
        'sortByPublishing',
      ];

      const filtersChanged = filterKeys.some(
        (key) => payload[key] !== undefined && payload[key] !== prev[key]
      );
      state.public.articles = {
        ...next,
        startIndex: resetStartIndex && filtersChanged ? 0 : next.startIndex,
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
  setPublicArticlesFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
