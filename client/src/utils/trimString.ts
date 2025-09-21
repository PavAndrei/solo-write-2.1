export const trimString = (str: string, maxLength: number): string => {
  if (!str || str.length <= maxLength) {
    return str;
  }

  return str.substring(0, maxLength) + '...';
};
