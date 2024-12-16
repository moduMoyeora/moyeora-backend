import express from "express";
import { joinUser , loginUser, checkDuplicate } from "../controllers/userController";
import { joinUserValidationRules, checkDuplicateRules ,loginUserValidationRules, validateUser} from "../validators/userValidator";

const router = express.Router({mergeParams: true});

router.post("/join", joinUserValidationRules(),validateUser, joinUser);
router.get("/check", checkDuplicateRules(), validateUser, checkDuplicate);
router.post("/login", loginUserValidationRules(),validateUser, loginUser);

export default router;