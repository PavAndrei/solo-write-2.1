import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../types/api';
import type { AuthState } from './auth.types';
import {
  checkAuthUser,
  signInUser,
  signOutUser,
  signUpUser,
} from './asyncActions';

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
      })

      .addCase(checkAuthUser.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(checkAuthUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload.data;
      })
      .addCase(checkAuthUser.rejected, (state) => {
        state.status = Status.ERROR;
      });

    builder.addCase(signOutUser.fulfilled, (state) => {
      state.user = null;
      state.status = Status.IDLE;
    });
  },
});

export default authSlice.reducer;
