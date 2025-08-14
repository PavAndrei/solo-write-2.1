import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../types/api';
import type { AuthState } from './auth.types';
import { signInUser, signUpUser } from './asyncActions';

const initialState: AuthState = {
  user: null,
  status: Status.IDLE,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload.data;
      })
      .addCase(signInUser.rejected, (state) => {
        state.status = Status.ERROR;
      })

      .addCase(signUpUser.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload.data;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export default authSlice.reducer;
