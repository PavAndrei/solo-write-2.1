import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../types/api';
import type { ArticleState } from './article.types';
import { createArticleAsync } from './asyncActions';

const initialState: ArticleState = {
  list: {
    items: [],
    status: Status.IDLE,
  },
  current: {
    item: null,
    status: Status.IDLE,
  },
  create: {
    status: Status.IDLE,
  },
  edit: {
    status: Status.IDLE,
  },
  delete: {
    status: Status.IDLE,
  },
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createArticleAsync.pending, (state) => {
      state.create.status = Status.LOADING;
    });
    builder.addCase(createArticleAsync.fulfilled, (state) => {
      state.create.status = Status.SUCCESS;
    });
    builder.addCase(createArticleAsync.rejected, (state) => {
      state.create.status = Status.ERROR;
    });
  },
});

export default articleSlice.reducer;
