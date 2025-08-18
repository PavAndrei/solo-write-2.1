import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../types/api';
import type { AuthState } from './auth.types';
import {
  authWithGoogle,
  checkAuthUser,
  signInUser,
  signOutUser,
  signUpUser,
} from './asyncActions';

const initialState: AuthState = {
  user: null,
  status: Status.IDLE,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = Status.LOADING;
        state.isAuthChecked = false;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload.data;
        state.isAuthChecked = true;
      })
      .addCase(signInUser.rejected, (state) => {
        state.status = Status.ERROR;
        state.isAuthChecked = true;
      })

      .addCase(signUpUser.pending, (state) => {
        state.status = Status.LOADING;
        state.isAuthChecked = false;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload.data;
        state.isAuthChecked = true;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.status = Status.ERROR;
        state.isAuthChecked = true;
      })

      .addCase(checkAuthUser.pending, (state) => {
        state.status = Status.LOADING;
        state.isAuthChecked = false;
      })
      .addCase(checkAuthUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload.data;
        state.isAuthChecked = true;
      })
      .addCase(checkAuthUser.rejected, (state) => {
        state.status = Status.ERROR;
        state.isAuthChecked = true;
      })

      .addCase(authWithGoogle.pending, (state) => {
        state.status = Status.LOADING;
        state.isAuthChecked = false;
      })
      .addCase(authWithGoogle.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload.data;
        state.isAuthChecked = true;
      })
      .addCase(authWithGoogle.rejected, (state) => {
        state.status = Status.ERROR;
        state.isAuthChecked = true;
      });

    builder.addCase(signOutUser.fulfilled, (state) => {
      state.user = null;
      state.status = Status.IDLE;
      state.isAuthChecked = true;
    });
  },
});

export default authSlice.reducer;
