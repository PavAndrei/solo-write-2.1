import { configureStore } from '@reduxjs/toolkit';

import auth from '../../features/auth/slices/authSlice';
import theme from '../../features/theme/slices/themeSlice';

const store = configureStore({
  reducer: { auth, theme },
});

export default store;
