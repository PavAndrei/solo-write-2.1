import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse } from '../../../types/api';
import type { AuthUser, SignInFormData } from '../types/auth.types';
import { signIn, signUp } from '../api/auth.api';

export const signInUser = createAsyncThunk<
  ApiResponse<AuthUser>,
  SignInFormData,
  { rejectValue: string }
>('auth/signInUser', async (formData, { rejectWithValue }) => {
  try {
    const response = await signIn(formData);

    if (!response.success) {
      return rejectWithValue(response.message || 'Login failed');
    }

    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});

export const signUpUser = createAsyncThunk<
  ApiResponse<AuthUser>,
  FormData,
  { rejectValue: string }
>('auth/signUpUser', async (formData, { rejectWithValue }) => {
  try {
    const response = await signUp(formData);

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
