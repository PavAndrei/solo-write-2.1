import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../types/api';
import type { CommentState } from './comment.types';
import {
  createCommentAsync,
  deleteCommentAsync,
  fetchArticleComments,
} from './asyncAction';

const initialState: CommentState = {
  current: {
    items: [],
    status: Status.IDLE,
  },
  create: {
    status: Status.IDLE,
  },
  delete: {
    status: Status.IDLE,
  },
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
      if (action.payload.data)
        state.current.items = [...state.current.items, action.payload.data];
    });
    builder.addCase(createCommentAsync.rejected, (state) => {
      state.create.status = Status.ERROR;
    });

    builder.addCase(fetchArticleComments.pending, (state) => {
      state.current.status = Status.LOADING;
    });
    builder.addCase(fetchArticleComments.fulfilled, (state, action) => {
      state.current.status = Status.SUCCESS;
      if (action.payload.data) state.current.items = action.payload.data;
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
      state.current.items = state.current.items.filter(
        (item) => item._id !== id
      );
    });
    builder.addCase(deleteCommentAsync.rejected, (state) => {
      state.delete.status = Status.ERROR;
    });
  },
});

export default commentSlice.reducer;
