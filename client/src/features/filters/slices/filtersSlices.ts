import { createSlice } from '@reduxjs/toolkit';
import type { Filters } from './filters.types';

const initialState: Filters = {
  filters: {
    public: undefined,
    admin: {
      users: {
        role: 'user',
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
  },
};

const filtersSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {},
});

export default filtersSlice.reducer;
