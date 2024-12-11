"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userValidator_1 = require("../validators/userValidator");
const router = express_1.default.Router({ mergeParams: true });
router.post("/join", (0, userValidator_1.joinUserValidationRules)(), userValidator_1.validateUser, userController_1.joinUser);
router.post("/check-email", userController_1.checkEmail);
router.post("/check-nickname", userController_1.checkNickname);
router.post("/login", (0, userValidator_1.loginUserValidationRules)(), userValidator_1.validateUser, userController_1.loginUser);
exports.default = router;
