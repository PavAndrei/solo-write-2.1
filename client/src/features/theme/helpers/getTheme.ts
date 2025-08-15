export const getThemeFromLocalStorage = (): 'light' | 'dark' => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme === 'dark' ? 'dark' : 'light';
};
