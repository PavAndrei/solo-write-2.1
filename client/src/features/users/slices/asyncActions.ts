import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse } from '../../../types/api';
import type {
  FetchUsersRequestParams,
  UserResponseData,
} from '../types/users.types';
import { getAllUsers } from '../api/users.api';

export const fetchUsers = createAsyncThunk<
  ApiResponse<UserResponseData>,
  FetchUsersRequestParams,
  { rejectValue: string }
>('users/fetchUsers', async (params, { rejectWithValue }) => {
  try {
    const response = await getAllUsers(params);

    if (!response.success) {
      return rejectWithValue(response.message || 'Authentification failed');
    }

    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});
