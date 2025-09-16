import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../types/api';
import type { ArticleState } from './article.types';
import { createArticleAsync, fetchArticles } from './asyncActions';

const initialState: ArticleState = {
  list: {
    items: [],
    popularItems: [],
    total: 0,
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

    builder.addCase(fetchArticles.pending, (state) => {
      state.list.status = Status.LOADING;
      state.list.items = [];
      state.list.popularItems = [];
      state.list.total = 0;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.list.status = Status.SUCCESS;
      state.list.items = action.payload.data?.articles;
      state.list.popularItems = action.payload.data?.popularArticle;
      state.list.total = action.payload.data?.totalArticles;
    });
    builder.addCase(fetchArticles.rejected, (state) => {
      state.list.status = Status.ERROR;
      state.list.items = [];
      state.list.popularItems = [];
      state.list.total = 0;
    });
  },
});

export default articleSlice.reducer;
