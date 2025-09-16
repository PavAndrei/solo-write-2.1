import { z } from 'zod';

export const editorSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title should not exceed 200 characters'),

  description: z
    .string()
    .min(1, 'Description is required')
    .max(349, 'Title should not exceed 350 characters'),

  content: z.string().min(1, 'Content is required'),
  // .max(3500, 'Content should not exceed 3500 characters'),

  categories: z
    .array(z.string())
    .min(2, 'At least 2 categories')
    .max(5, 'Maximum 5 categories'),

  images: z
    .array(z.any())
    .length(5, '5 images have to be uploaded')
    .refine(
      (files) =>
        files.every(
          (file) => file instanceof File && file.type.startsWith('image/')
        ),
      'All the files should be images'
    ),
});

export type EditorFormData = z.infer<typeof editorSchema>;
