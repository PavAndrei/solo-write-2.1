import { configureStore } from '@reduxjs/toolkit';

import auth from '../../features/auth/slices/authSlice';
import theme from '../../features/theme/slices/themeSlice';
import users from '../../features/users/slices/usersSlice';

const store = configureStore({
  reducer: { auth, theme, users },
});

export default store;
