import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../types/api';
import type { ArticleState } from './article.types';
import {
  createArticleAsync,
  fetchArticles,
  fetchOneArticle,
  fetchArticleLike,
} from './asyncActions';
import { updateLikes } from '../../../utils/updateLikes';

const initialState: ArticleState = {
  list: { items: null, popularItems: null, total: 0, status: Status.IDLE },
  current: { item: null, status: Status.IDLE },
  create: { status: Status.IDLE },
  edit: { status: Status.IDLE },
  delete: { status: Status.IDLE },
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
      state.list.items = null;
      state.list.popularItems = null;
      state.list.total = 0;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.list.status = Status.SUCCESS;
      state.list.items = action.payload.data?.articles || [];
      state.list.popularItems = action.payload.data?.popularArticle || [];
      state.list.total = action.payload.data?.totalArticles || 0;
    });
    builder.addCase(fetchArticles.rejected, (state) => {
      state.list.status = Status.ERROR;
      state.list.items = null;
      state.list.popularItems = null;
      state.list.total = 0;
    });

    builder.addCase(fetchOneArticle.pending, (state) => {
      state.current.status = Status.LOADING;
      state.current.item = null;
    });
    builder.addCase(fetchOneArticle.fulfilled, (state, action) => {
      state.current.status = Status.SUCCESS;
      state.current.item = action.payload.data || null;
    });
    builder.addCase(fetchOneArticle.rejected, (state) => {
      state.current.status = Status.ERROR;
      state.current.item = null;
    });

    builder.addCase(fetchArticleLike.fulfilled, (state, action) => {
      const { likedEntityId, userId } = action.payload.data || {};
      if (!likedEntityId || !userId) return;

      state.list.items =
        state.list.items?.map((a) =>
          a._id === likedEntityId ? updateLikes(a, userId) : a
        ) || null;

      if (state.current.item && state.current.item._id === likedEntityId) {
        state.current.item = updateLikes(state.current.item, userId);
      }
    });
    builder.addCase(fetchArticleLike.rejected, (_, action) => {
      console.error('Attempting like failed', action.payload);
    });
  },
});

export default articleSlice.reducer;
