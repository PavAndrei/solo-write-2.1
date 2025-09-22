/**
 * Схема типов для фильтров → TS гарантирует, что ключи совпадают с интерфейсом
 */
export type ParamSchema<T> = {
  [K in keyof T]-?: 'string' | 'number' | 'boolean' | 'string[]';
};
