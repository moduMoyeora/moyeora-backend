"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.loginUserValidationRules = exports.joinUserValidationRules = void 0;
const express_validator_1 = require("express-validator");
const joinUserValidationRules = () => {
    return [
        (0, express_validator_1.body)('email')
            .notEmpty()
            .withMessage('사용할 아이디는 필수입니다')
            .isEmail()
            .withMessage('아이디는 이메일 형식이어야 합니다'),
        (0, express_validator_1.body)('password')
            .notEmpty()
            .withMessage('사용할 비밀번호는 필수입니다'),
        // 비밀번호 조건 체크
        (0, express_validator_1.body)('nickname')
            .notEmpty()
            .withMessage('사용할 닉네임은 필수입니다')
            .isLength({ min: 2 })
            .withMessage('사용할 닉네임은 2자 이상이어야 합니다'),
    ];
};
exports.joinUserValidationRules = joinUserValidationRules;
const loginUserValidationRules = () => {
    return [
        (0, express_validator_1.body)('email')
            .notEmpty()
            .withMessage('로그인할 아이디를 입력해주세요')
            .isEmail()
            .withMessage('아이디는 이메일 형식이어야 합니다'),
        (0, express_validator_1.body)('password').notEmpty().withMessage('로그인할 비밀번호를 입력해주세요'),
    ];
};
exports.loginUserValidationRules = loginUserValidationRules;
const validateUser = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
        return;
    }
    next();
};
exports.validateUser = validateUser;
