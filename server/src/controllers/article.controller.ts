import { Response, NextFunction } from 'express';
import { MultipleImagesRequest } from '../middlewares/uploadImages';

export const createArticle = async (
  req: MultipleImagesRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, content, categories } = req.body;
    const imageUrls = req.imageUrls || [];
    const userId = req.userId;

    const categoriesArray = JSON.parse(categories);

    console.log('Received article data:', {
      title,
      description,
      content,
      categories: categoriesArray,
      imageUrls,
      userId,
    });

    return res.status(201).json({
      message: 'Article created successfully',
      article: {
        title,
        description,
        content,
        categories: categoriesArray,
        imageUrls,
        author: userId,
      },
    });
  } catch (err) {
    next(err);
  }
};
