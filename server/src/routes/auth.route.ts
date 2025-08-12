import { Router } from 'express';
import { signin } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { signinSchema } from '../schemas/auth.schema';

export const authRouter = Router();

authRouter.post('/signin', validate(signinSchema), signin);
