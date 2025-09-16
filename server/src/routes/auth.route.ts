import { Router } from 'express';
import {
  signIn,
  signUp,
  getMe,
  signOut,
  googleAuth,
} from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { signinSchema, signupSchema } from '../schemas/auth.schema';
import { uploadImage } from '../middlewares/uploadImages';
import { checkAuth } from '../middlewares/checkAuth';
import { upload } from '../middlewares/upload';

export const authRouter = Router();

authRouter.post('/signin', validate(signinSchema), signIn);

authRouter.post(
  '/signup',
  upload.single('image'), // только multer
  validate(signupSchema),
  signUp
);
authRouter.get('/me', checkAuth, getMe);
authRouter.post('/signout', signOut);
authRouter.post('/google', googleAuth);
