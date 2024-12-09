import { Router } from 'express';
import { getPostsByBoardIdController } from '../controllers/boardController';
import { validateGetPostsByBoardId } from '../validators/postValidator';
import { validateRequest } from '../validators/validateRequest';

const router = Router();

router.get('/:board_id/posts', [...validateGetPostsByBoardId, validateRequest], getPostsByBoardIdController);

export default router;