import { Response, NextFunction } from 'express';
import { MultipleImagesRequest } from '../middlewares/uploadImages';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../configs/cloudinary.config';
import { Readable } from 'stream';
import { errorHandler } from '../middlewares/handleErrors';

// export const createArticle = async (
//   req: MultipleImagesRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { title, description, content, categories } = req.body;
//     const imageUrls = req.imageUrls || [];
//     const userId = req.userId;

//     const categoriesArray = JSON.parse(categories);

//     console.log('Received article data:', {
//       title,
//       description,
//       content,
//       categories: categoriesArray,
//       imageUrls,
//       userId,
//     });

//     return res.status(201).json({
//       message: 'Article created successfully',
//       article: {
//         title,
//         description,
//         content,
//         categories: categoriesArray,
//         imageUrls,
//         author: userId,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

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

    const categoriesArray = JSON.parse(categories);

    // проверка количества картинок
    if (!Array.isArray(req.files) || req.files.length !== 5) {
      throw errorHandler(400, 'Exactly 5 images are required');
    }

    // загружаем картинки только после валидации body
    const results = await Promise.all(
      (req.files as Express.Multer.File[]).map((file) =>
        streamUpload(file.buffer)
      )
    );

    const imageUrls = results.map((r) => r.secure_url);

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
