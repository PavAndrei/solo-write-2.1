import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse } from '../../../types/api';
import type {
  Comment,
  CommentList,
  CreateCommentPayload,
  DeletedCommentData,
} from '../types/comment.types';
import {
  createComment,
  deleteComment,
  getCommentsByArticle,
} from '../api/comment.api';

export const createCommentAsync = createAsyncThunk<
  ApiResponse<Comment>,
  CreateCommentPayload,
  { rejectValue: string }
>('comment/createComment', async (payload, { rejectWithValue }) => {
  try {
    const response = await createComment(payload);
    if (!response.success) {
      return rejectWithValue(response.message || 'Creating comment failed');
    }
    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});

export const fetchArticleComments = createAsyncThunk<
  ApiResponse<CommentList>,
  string,
  { rejectValue: string }
>('comment/getOneArticleComments', async (id, { rejectWithValue }) => {
  try {
    const response = await getCommentsByArticle(id);
    if (!response.success) {
      return rejectWithValue(response.message || 'Fetching comments failed');
    }
    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});

export const deleteCommentAsync = createAsyncThunk<
  ApiResponse<DeletedCommentData>,
  string,
  { rejectValue: string }
>('comment/deleteComment', async (id, { rejectWithValue }) => {
  try {
    const response = await deleteComment(id);
    if (!response.success) {
      return rejectWithValue(response.message || 'Deleting comment failed');
    }
    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});
