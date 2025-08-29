import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse } from '../../../types/api';
import type {
  FetchUsersRequestParams,
  User,
  UserResponseData,
} from '../types/users.types';
import { getAllUsers, deleteUserById } from '../api/users.api';

export const fetchUsers = createAsyncThunk<
  ApiResponse<UserResponseData>,
  Partial<FetchUsersRequestParams>,
  { rejectValue: string }
>('users/fetchUsers', async (params, { rejectWithValue }) => {
  try {
    const response = await getAllUsers(params);

    if (!response.success) {
      return rejectWithValue(response.message || 'Fetching users failed');
    }

    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});

export const deleteUser = createAsyncThunk<
  ApiResponse<User>,
  string,
  { rejectValue: string }
>('users/deleteUser', async (id, { rejectWithValue }) => {
  try {
    const response = await deleteUserById(id);

    if (!response.success) {
      return rejectWithValue(response.message || 'Deleting users failed');
    }

    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});
