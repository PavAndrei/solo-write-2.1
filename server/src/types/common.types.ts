// images middleware request

import { Request } from 'express';

export interface ImageRequest<P = {}, ResBody = {}, ReqBody = {}>
  extends Request<P, ResBody, ReqBody> {
  file?: Express.Multer.File;
  imageUrl?: string;
  imageUrls?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
