import express from 'express';
import {
  joinUser,
  loginUser,
  checkDuplicate,
  viewProfile,
  editProfile,
} from '../controllers/userController';
import {
  joinUserValidationRules,
  checkDuplicateRules,
  loginUserValidationRules,
  validateUser,
  viewProfileRules,
  editProfileRules,
} from '../validators/userValidator';
import { authWithMemberId } from '../middlewares/authMiddleware';

const router = express.Router({ mergeParams: true });

router.post('/join', joinUserValidationRules(), validateUser, joinUser);
router.get('/check', checkDuplicateRules(), validateUser, checkDuplicate);
router.post('/login', loginUserValidationRules(), validateUser, loginUser);
router.get(
  '/profile/:memberId',
  authWithMemberId,
  viewProfileRules(),
  validateUser,
  viewProfile
);
router.put(
  '/profile/:memberId',
  authWithMemberId,
  editProfileRules(),
  validateUser,
  editProfile
);

export default router;
