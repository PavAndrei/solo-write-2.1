import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../types/api';
import type { CommentState } from './comment.types';
import {
  createCommentAsync,
  deleteCommentAsync,
  fetchAllComments,
  fetchArticleComments,
  fetchCommentLike,
} from './asyncAction';
import { updateLikes } from '../../../utils/updateLikes';

const initialState: CommentState = {
  current: { items: [], status: Status.IDLE },
  list: { items: [], status: Status.IDLE, total: null, count: null },
  create: { status: Status.IDLE },
  delete: { status: Status.IDLE },
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCommentAsync.pending, (state) => {
      state.create.status = Status.LOADING;
    });
    builder.addCase(createCommentAsync.fulfilled, (state, action) => {
      state.create.status = Status.SUCCESS;
      if (action.payload.data) state.current.items.push(action.payload.data);
    });
    builder.addCase(createCommentAsync.rejected, (state) => {
      state.create.status = Status.ERROR;
    });

    builder.addCase(fetchArticleComments.pending, (state) => {
      state.current.status = Status.LOADING;
    });
    builder.addCase(fetchArticleComments.fulfilled, (state, action) => {
      state.current.status = Status.SUCCESS;
      state.current.items = action.payload.data || [];
    });
    builder.addCase(fetchArticleComments.rejected, (state) => {
      state.current.status = Status.ERROR;
    });

    builder.addCase(deleteCommentAsync.pending, (state) => {
      state.delete.status = Status.LOADING;
    });
    builder.addCase(deleteCommentAsync.fulfilled, (state, action) => {
      state.delete.status = Status.SUCCESS;
      const id = action.payload.data?.deletedCommentId;
      state.current.items = state.current.items.filter((c) => c._id !== id);
      state.list.items = state.list.items.filter((c) => c._id !== id);
    });
    builder.addCase(deleteCommentAsync.rejected, (state) => {
      state.delete.status = Status.ERROR;
    });

    builder.addCase(fetchCommentLike.fulfilled, (state, action) => {
      const { likedEntityId, userId } = action.payload.data || {};
      if (!likedEntityId || !userId) return;

      state.current.items = state.current.items.map((c) =>
        c._id === likedEntityId ? updateLikes(c, userId) : c
      );

      state.list.items = state.list.items.map((c) =>
        c._id === likedEntityId ? updateLikes(c, userId) : c
      );
    });
    builder.addCase(fetchCommentLike.rejected, (_, action) => {
      console.error('Attempting like failed', action.payload);
    });

    builder.addCase(fetchAllComments.pending, (state) => {
      state.list.status = Status.LOADING;
    });
    builder.addCase(fetchAllComments.fulfilled, (state, action) => {
      state.list.status = Status.SUCCESS;
      state.list.items = action.payload.data?.comments || [];
      state.list.count = action.payload.data?.count || null;
      state.list.total = action.payload.data?.total || null;
    });
    builder.addCase(fetchAllComments.rejected, (state) => {
      state.list.status = Status.ERROR;
      state.list.items = [];
      state.list.count = null;
      state.list.total = null;
    });
  },
});

export default commentSlice.reducer;
