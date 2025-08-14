export type RequiredExcept<T, K extends keyof T> = Required<Omit<T, K>> &
  Partial<Pick<T, K>>;
