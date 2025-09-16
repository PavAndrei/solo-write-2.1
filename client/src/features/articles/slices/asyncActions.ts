import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse } from '../../../types/api';
import type { AllArticlesResponse, Article } from '../types/article.types';
import { createArticle, getAllArticles } from '../api/articles.api';

export const createArticleAsync = createAsyncThunk<
  ApiResponse<Article>,
  FormData,
  { rejectValue: string }
>('article/createArticle', async (formData, { rejectWithValue }) => {
  try {
    const response = await createArticle(formData);
    if (!response.success) {
      return rejectWithValue(response.message || 'Registration failed');
    }
    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});

export const fetchArticles = createAsyncThunk<
  ApiResponse<AllArticlesResponse>,
  void,
  { rejectValue: string }
>('article/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllArticles();
    if (!response.success) {
      return rejectWithValue(response.message || 'Registration failed');
    }
    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});
