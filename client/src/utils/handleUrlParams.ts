import type { ParamSchema } from '../types/urlParsing';
import { parseBool } from './parseBool';

/**
 * Преобразует строковые параметры URL в объект с правильными типами
 */
export function parseUrlParams<T extends object>(
  searchParams: URLSearchParams,
  schema: ParamSchema<T>
): Partial<T> {
  const allParams = Object.fromEntries(searchParams.entries());
  const parsed: Partial<T> = {};

  (Object.keys(schema) as (keyof T)[]).forEach((key) => {
    const rawValue = allParams[key as string];
    if (rawValue === undefined) return;

    const type = schema[key];
    switch (type) {
      case 'string':
        parsed[key] = rawValue as T[keyof T];
        break;
      case 'number':
        parsed[key] = Number(rawValue) as T[keyof T];
        break;
      case 'boolean':
        parsed[key] = parseBool(rawValue) as T[keyof T];
        break;
    }
  });

  return parsed;
}

/**
 * Преобразует объект фильтров в URL-параметры (строки)
 */
export function toUrlParams<T extends object>(
  filters: Partial<T>,
  defaults: Partial<T> = {}
): Record<string, string> {
  const params: Record<string, string> = {};

  (Object.keys(filters) as (keyof T)[]).forEach((key) => {
    const value = filters[key];
    if (value === undefined) return;

    // --- исключение для startIndex и limit ---
    if (key === 'startIndex' && value === 0) return;
    if (key === 'limit') return; // limit вообще не пишем в URL
    if (defaults[key] === value) return;
    if (value === '' || value === undefined) return;

    if (typeof value === 'boolean') {
      if (value) params[key as string] = 'true';
    } else {
      params[key as string] = String(value);
    }
  });

  return params;
}
