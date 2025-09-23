import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse } from '../../../types/api';
import type {
  AllArticlesResponse,
  Article,
  ArticleLikeResponse,
  FetchArticlesRequestParams,
} from '../types/article.types';
import {
  createArticle,
  getAllArticles,
  getOneArticle,
  toggleArticleLike,
} from '../api/articles.api';

export const createArticleAsync = createAsyncThunk<
  ApiResponse<Article>,
  FormData,
  { rejectValue: string }
>('article/createArticle', async (formData, { rejectWithValue }) => {
  try {
    const response = await createArticle(formData);
    if (!response.success) {
      return rejectWithValue(response.message || 'Creating artcile failed');
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
  Partial<FetchArticlesRequestParams>,
  { rejectValue: string }
>('article/getAll', async (params, { rejectWithValue }) => {
  try {
    const response = await getAllArticles(params);
    if (!response.success) {
      return rejectWithValue(response.message || 'Fetching articles failed');
    }
    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});

export const fetchOneArticle = createAsyncThunk<
  ApiResponse<Article>,
  string,
  { rejectValue: string }
>('article/getOne', async (slug, { rejectWithValue }) => {
  try {
    const response = await getOneArticle(slug);
    if (!response.success) {
      return rejectWithValue(response.message || 'Fetching article failed');
    }
    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});

export const fetchArticleLike = createAsyncThunk<
  ApiResponse<ArticleLikeResponse>,
  string,
  { rejectValue: string }
>('article/like', async (slug, { rejectWithValue }) => {
  try {
    const response = await toggleArticleLike(slug);

    if (!response.success) {
      return rejectWithValue(response.message || 'Fetching like failed');
    }
    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});
