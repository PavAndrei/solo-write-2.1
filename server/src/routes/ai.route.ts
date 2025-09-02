// routes/ai.routes.js
import { Router } from 'express';
import { checkAuth } from '../middlewares/checkAuth';
import { editText } from '../controllers/ai.controller';

const aiRouter = Router();

// aiRouter.post('/edit', checkAuth, editText);
// aiRouter.get('/runs/:runId', checkAuth, getRunResult);

aiRouter.post('/edit', checkAuth, editText);

export default aiRouter;
