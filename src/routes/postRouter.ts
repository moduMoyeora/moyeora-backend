import { Router } from 'express';
import { getPostByIdController } from '../controllers/postController';
import { validateGetPostById } from '../validators/postValidator';
import { validateRequest } from '../validators/validateRequest';

const router = Router();

router.get('/:id',  [...validateGetPostById, validateRequest], getPostByIdController);

export default router;
