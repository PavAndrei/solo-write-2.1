import { Router, Request, Response } from 'express';

console.log('🚀 Загружен файл article.route.ts:', __filename);

export const articleRouter = Router();

console.log('✅ articleRouter подключен');

// Тестовый POST /
articleRouter.post('/', (req: Request, res: Response) => {
  console.log('🔥 Сработал POST /api/article');
  res.json({ success: true, message: 'POST /api/article работает!' });
});

// Тестовый GET /
articleRouter.get('/', (req: Request, res: Response) => {
  console.log('🔥 Сработал GET /api/article');
  res.json({ success: true, message: 'GET /api/article работает!' });
});
