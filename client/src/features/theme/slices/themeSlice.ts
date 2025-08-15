import { createSlice } from '@reduxjs/toolkit';
import { getThemeFromLocalStorage } from '../helpers/getTheme';
import type { ThemeState } from '../types/theme.types';

const initialState: ThemeState = {
  themeColor: getThemeFromLocalStorage(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.themeColor === 'light' ? 'dark' : 'light';
      state.themeColor = newTheme;
      localStorage.setItem('theme', newTheme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
