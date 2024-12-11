import express from "express";
import { joinUser , loginUser, checkEmail, checkNickname } from "../controllers/userController";
import { joinUserValidationRules, loginUserValidationRules, validateUser} from "../validators/userValidator";

const router = express.Router({mergeParams: true});

router.post("/join", joinUserValidationRules(),validateUser, joinUser);
router.post("/check-email", checkEmail);
router.post("/check-nickname", checkNickname);
router.post("/login", loginUserValidationRules(),validateUser, loginUser);

export default router;