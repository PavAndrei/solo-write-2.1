import { Request, Response, NextFunction } from 'express';
import { MultipleImagesRequest } from '../middlewares/uploadImages';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../configs/cloudinary.config';
import { Readable } from 'stream';
import { errorHandler } from '../middlewares/handleErrors';
import { Article } from '../models/article.model';
import slugify from 'slugify';

const streamUpload = (buffer: Buffer): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'uploads' },
      (err, result) => {
        if (err || !result) return reject(err);
        resolve(result);
      }
    );
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

export const createArticle = async (
  req: MultipleImagesRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, content, categories } = req.body;
    const userId = req.userId;

    if (!userId) {
      throw errorHandler(401, 'Unauthorized');
    }

    const categoriesArray = JSON.parse(categories);

    const existingArticle = await Article.findOne({
      $or: [{ title }, { description }],
    }).lean();

    if (existingArticle) {
      throw errorHandler(
        409,
        existingArticle.title === title
          ? 'Article with this title already exists'
          : 'Article with this description already exists'
      );
    }

    // Проверка картинок
    if (!Array.isArray(req.files) || req.files.length !== 5) {
      throw errorHandler(400, 'Exactly 5 images are required');
    }

    // Загружаем картинки в cloudinary
    const results = await Promise.all(
      (req.files as Express.Multer.File[]).map((file) =>
        streamUpload(file.buffer)
      )
    );

    const imageUrls = results.map((r) => r.secure_url);

    // Генерация slug из title
    const slug = slugify(title, { lower: true, strict: true });

    // Создаём документ
    const newArticle = await Article.create({
      title,
      description,
      content,
      categories: categoriesArray,
      images: imageUrls,
      slug,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: newArticle,
    });
  } catch (err) {
    next(err);
  }
};

export const getArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      start = 0,
      limit = 10,
      search,
      category,
      user,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    // Базовый фильтр
    const filter: any = {};

    if (search) {
      filter.$text = { $search: String(search) };
    }

    if (category) {
      filter.categories = { $in: [String(category)] };
    }

    if (user) {
      filter.user = user;
    }

    // Подсчет общего количества
    const totalArticles = await Article.countDocuments(filter);

    // Основной запрос (с populate user.username)
    const articles = await Article.find(filter)
      .sort({ [String(sortBy)]: order === 'desc' ? -1 : 1 })
      .skip(Number(start))
      .limit(Number(limit))
      .populate('user', 'username -_id') // вытягиваем только username
      .lean<{ user: { username: string } }[]>(); // подсказываем TS структуру

    // Преобразуем под нужный формат (заменяем user → author)
    const formattedArticles = articles.map((a) => ({
      ...a,
      author: a.user?.username || 'Unknown',
    }));

    // Самые популярные статьи (топ-3 по viewsCount)
    const popularArticles = await Article.find({})
      .sort({ viewsCount: -1 })
      .limit(3)
      .populate('user', 'username -_id')
      .lean<{ user: { username: string } }[]>();

    const formattedPopular = popularArticles.map((a) => ({
      ...a,
      author: a.user?.username || 'Unknown',
    }));

    res.status(200).json({
      success: true,
      message: 'Articles received',
      data: {
        articles: formattedArticles,
        totalArticles,
        popularArticles: formattedPopular,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getOneArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // поиск статьи
    const article = await Article.findById(id)
      .populate('user', 'username -_id')
      .lean<{ user: { username: string } } | null>();

    if (!article) {
      throw errorHandler(404, 'Article not found');
    }

    const formattedArticle = {
      ...article,
      author: article.user?.username || 'Unknown',
    };

    res.status(200).json({
      success: true,
      message: 'Article received',
      data: formattedArticle,
    });
  } catch (err) {
    next(err);
  }
};
