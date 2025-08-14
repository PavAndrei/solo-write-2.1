import { configureStore } from '@reduxjs/toolkit';

import auth from '../../features/auth/slices/authSlice';

const store = configureStore({
  reducer: { auth },
});

export default store;
