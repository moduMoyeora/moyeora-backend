import express from 'express';
import { getBoards } from '../controllers/boardController';
import {
  offsetQueryValidationRules,
  validateBoard,
} from '../validators/boardValidator';

const router = express.Router();

router.get('/', offsetQueryValidationRules(), validateBoard, getBoards);

export default router;
