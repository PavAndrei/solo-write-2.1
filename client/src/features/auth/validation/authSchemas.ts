import { z } from 'zod';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from '../../../constants/fileValidationParams';

export const AuthSchema = z
  .object({
    // Общие поля для sign-in и sign-up
    email: z
      .string()
      .email('Invalid email')
      .max(50, 'Email should not be longer than 50 characters'),
    password: z
      .string()
      .min(6, 'Password should be at least 6 characters')
      .max(20, 'Password should not exceed 20 characters'),

    // Поля только для sign-up (помечены как optional в базовой схеме)
    username: z
      .string()
      .min(3, 'Username should be at least 3 characters')
      .max(20, 'Username should not exceed 20 characters')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Only English letters, numbers and underscores are allowed'
      )
      .optional(),

    repeatPassword: z.string().optional(),

    terms: z.boolean().optional(),

    file: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    // Валидация дополнительных полей ТОЛЬКО если это sign-up (определяем по наличию username)
    if (data.username !== undefined) {
      // Проверка repeatPassword
      if (!data.repeatPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please repeat your password',
          path: ['repeatPassword'],
        });
      } else if (data.password !== data.repeatPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match",
          path: ['repeatPassword'],
        });
      }

      // Проверка terms
      if (data.terms !== true) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'You must accept the terms',
          path: ['terms'],
        });
      }

      // Проверка файла (если он есть)
      if (data.file?.[0]) {
        if (data.file[0].size > MAX_FILE_SIZE) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Maximum file size is 1MB',
            path: ['file'],
          });
        }
        if (!ACCEPTED_IMAGE_TYPES.includes(data.file[0].type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Allowed formats: .jpg, .jpeg, .png, .webp',
            path: ['file'],
          });
        }
      }
    }
  });

export type AuthFormData = z.infer<typeof AuthSchema>;
