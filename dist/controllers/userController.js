"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.checkNickname = exports.checkEmail = exports.joinUser = void 0;
const userModel = __importStar(require("../models/userModel"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, nickname } = req.body;
    try {
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hashSync(password, salt);
        const user = yield userModel.join(email, hashedPassword, nickname);
        res.status(200).json(user);
        return;
    }
    catch (error) {
        res.json(error);
        return;
    }
});
exports.joinUser = joinUser;
const checkEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield userModel.checkEmail(email);
        if (user === null) {
            res.status(200).json({ email: email, isAvailable: true });
            return;
        }
        res.status(409).json({ email: email, isAvailable: false });
        return;
    }
    catch (error) {
        res.json(error);
        return;
    }
});
exports.checkEmail = checkEmail;
const checkNickname = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname } = req.body;
    try {
        const user = yield userModel.checkNickname(nickname);
        if (user === null) {
            res.status(200).json({ nickname: nickname, isAvailable: true });
            return;
        }
        res.status(409).json({ nickname: nickname, isAvailable: false });
        return;
    }
    catch (error) {
        res.json(error);
        return;
    }
});
exports.checkNickname = checkNickname;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel.login(email);
        if (user === null) {
            res.status(401).json({ message: '아이디나 비밀번호가 틀립니다' });
            return;
        }
        const isMatch = yield bcrypt.compareSync(password, user[0].password);
        if (!isMatch) {
            res.status(401).json({ message: '아이디나 비밀번호가 틀립니다' });
            return;
        }
        const token = jwt.sign({
            id: user[0].id,
            email: user[0].email,
            nickName: user[0].nickname
        }, process.env.PRIVATE_KEY, {
            expiresIn: '1000000000m',
            issuer: 'moyeora-server',
        });
        res.cookie('Authorization', token, {
            httpOnly: true,
        });
        res.status(200).json({ message: '로그인 성공' });
        return;
    }
    catch (error) {
        res.json(error);
        return;
    }
});
exports.loginUser = loginUser;
