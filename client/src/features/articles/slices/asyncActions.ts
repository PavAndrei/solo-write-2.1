// export const signUpUser = createAsyncThunk<
//   ApiResponse<AuthUser>,
//   FormData,
//   { rejectValue: string }
// >('auth/signUpUser', async (formData, { rejectWithValue }) => {
//   try {
//     const response = await signUp(formData);

//     if (!response.success) {
//       return rejectWithValue(response.message || 'Registration failed');
//     }

//     return response;
//   } catch (err) {
//     return rejectWithValue(
//       err instanceof Error ? err.message : 'Unknown error'
//     );
//   }
// });
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse } from '../../../types/api';
import type { Article } from '../types/article.types';
import { createArticle } from '../api/articles.api';

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
