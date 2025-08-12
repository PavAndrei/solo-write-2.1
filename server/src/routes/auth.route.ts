import { Router } from 'express';
import { signin, signup } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { signinSchema, signupSchema } from '../schemas/auth.schema';
import { uploadImage } from '../middlewares/uploadImages';

export const authRouter = Router();

authRouter.post('/signin', validate(signinSchema), signin);
authRouter.post('/signup', uploadImage, validate(signupSchema), signup);
