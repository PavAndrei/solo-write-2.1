import { createSlice } from '@reduxjs/toolkit';
import type { UsersState } from './users.types';
import { Status } from '../../../types/api';
import { fetchUsers } from './asyncActions';

const initialState: UsersState = {
  data: null,
  status: Status.IDLE,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export default usersSlice.reducer;
