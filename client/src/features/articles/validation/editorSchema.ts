import { z } from 'zod';

export const editorSchema = z.object({
  title: z
    .string()
    .min(1, 'Название обязательно для заполнения')
    .max(200, 'Название не должно превышать 200 символов'),

  description: z
    .string()
    .min(1, 'Описание обязательно для заполнения')
    .max(350, 'Описание не должно превышать 350 символов'),

  content: z
    .string()
    .min(1, 'Содержание обязательно для заполнения')
    .max(3500, 'Содержание не должно превышать 3500 символов'),

  categories: z
    .array(z.string())
    .min(2, 'Выберите минимум 2 категории')
    .max(5, 'Можно выбрать максимум 5 категорий'),

  images: z
    .array(z.any())
    .length(5, 'Необходимо загрузить ровно 5 изображений')
    .refine(
      (files) =>
        files.every(
          (file) => file instanceof File && file.type.startsWith('image/')
        ),
      'Все файлы должны быть изображениями'
    ),
});

export type EditorFormData = z.infer<typeof editorSchema>;
