import { configureStore } from '@reduxjs/toolkit';

import auth from '../../features/auth/slices/authSlice';
import theme from '../../features/theme/slices/themeSlice';
import users from '../../features/users/slices/usersSlice';
import filters from '../../features/filters/slices/filtersSlices';

const store = configureStore({
  reducer: { auth, theme, users, filters },
});

export default store;
