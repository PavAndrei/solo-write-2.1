import { Router } from 'express';
import { signIn, signUp, getMe, signOut } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { signinSchema, signupSchema } from '../schemas/auth.schema';
import { uploadImage } from '../middlewares/uploadImages';
import { checkAuth } from '../middlewares/checkAuth';

export const authRouter = Router();

authRouter.post('/signin', validate(signinSchema), signIn);
authRouter.post('/signup', uploadImage, validate(signupSchema), signUp);
authRouter.get('/me', checkAuth, getMe);
authRouter.post('/signout', signOut);
