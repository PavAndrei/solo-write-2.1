import { configureStore } from '@reduxjs/toolkit';

import auth from '../../features/auth/slices/authSlice';
import theme from '../../features/theme/slices/themeSlice';
import users from '../../features/users/slices/usersSlice';
import filters from '../../features/filters/slices/filtersSlices';
import modal from '../../features/modal/slices/modalSlice';
import articles from '../../features/articles/slices/articleSLice';
import comments from '../../features/comments/slices/commentSlice';

import { modalMiddleware } from '../../features/modal/slices/modalMiddleware';

export const store = configureStore({
  reducer: {
    auth,
    theme,
    users,
    filters,
    modal,
    articles,
    comments,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(modalMiddleware),
});

export default store;
