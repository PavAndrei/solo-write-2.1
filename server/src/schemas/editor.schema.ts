// validation/articleSchema.ts
import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(10, 'Title should be at least 10 characters long')
    .max(200, 'Title should not exceed 200 characters'),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(50, 'Description should be at least 50 characters long')
    .max(350, 'Description should not exceed 350 characters'),

  content: z
    .string()
    .min(1, 'Content is required')
    .min(500, 'Content should be at least 500 characters long'),

  categories: z
    .string()
    .transform((str) => {
      try {
        return JSON.parse(str);
      } catch {
        return [];
      }
    })
    .refine((arr) => Array.isArray(arr), {
      message: 'Categories must be a valid JSON array',
    })
    .refine((arr) => arr.length >= 2 && arr.length <= 5, {
      message: 'Select between 2 and 5 categories',
    })
    .refine((arr) => arr.every((item) => typeof item === 'string'), {
      message: 'All categories must be strings',
    }),
});
