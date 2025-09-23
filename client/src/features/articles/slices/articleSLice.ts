import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../types/api';
import type { ArticleState } from './article.types';
import {
  createArticleAsync,
  fetchArticles,
  fetchOneArticle,
} from './asyncActions';
import { fetchArticleLike } from './asyncActions';

const initialState: ArticleState = {
  list: {
    items: null,
    popularItems: null,
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
      state.list.items = null;
      state.list.popularItems = null;
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
      state.current.item = action.payload.data;
    });
    builder.addCase(fetchOneArticle.rejected, (state) => {
      state.list.status = Status.ERROR;
      state.current.item = null;
    });

    builder.addCase(fetchArticleLike.fulfilled, (state, action) => {
      const articleId = action.payload.data?.likedArticleId;
      const userId = action.payload.data?.userId;
      // const liked = action.payload.data?.liked;

      if (!articleId || !userId) {
        return;
      }

      state.list.items =
        state.list.items?.map((a) => {
          if (a._id !== articleId) return a;

          const likedBy = a.likedBy ? [...a.likedBy] : [];
          const index = likedBy.indexOf(userId);

          if (index === -1) {
            likedBy.push(userId);
          } else {
            likedBy.splice(index, 1);
          }

          return {
            ...a,
            likedBy,
            likesCount: likedBy.length,
          };
        }) || null;
    });
    builder.addCase(fetchArticleLike.rejected, (_, action) => {
      console.error('Attempting like failed', action.payload);
    });
  },
});

export default articleSlice.reducer;
