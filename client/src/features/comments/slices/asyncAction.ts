import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse } from '../../../types/api';
import type {
  Comment,
  CommentList,
  CreateCommentPayload,
} from '../types/comment.types';
import { createComment, getCommentsByArticle } from '../api/comment.api';

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
