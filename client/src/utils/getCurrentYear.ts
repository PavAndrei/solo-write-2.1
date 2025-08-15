export const getCurrentYear = (): string => {
  const data = new Date();
  const currentYear = data.getFullYear();

  return currentYear.toString();
};
