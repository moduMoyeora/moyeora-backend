import { Router } from 'express';
import { getPostsByBoardId, getPostById } from '../constrollers/PostController';

const router = Router();

router.get('/boards/:board_id', getPostsByBoardId);
router.get('/:id', getPostById);

export default router;
