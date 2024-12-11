"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.checkNickname = exports.checkEmail = exports.join = void 0;
const db_1 = __importDefault(require("../config/db"));
const join = (email, password, nickname) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.default.query(`INSERT INTO member (email, password, nickname) VALUES (?,?,?)`, [email, password, nickname]);
    console.log(result);
    const [users] = yield db_1.default.query(`SELECT * FROM member WHERE id = ?`, [result.insertId]);
    console.log(users);
    return users;
});
exports.join = join;
const checkEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield db_1.default.query(`SELECT * FROM member WHERE email = ?`, [email]);
    if (user.length === 0) {
        return null;
    }
    return user;
});
exports.checkEmail = checkEmail;
const checkNickname = (nickname) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield db_1.default.query(`SELECT * FROM member WHERE nickname = ?`, [nickname]);
    if (user.length === 0) {
        return null;
    }
    return user;
});
exports.checkNickname = checkNickname;
const login = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield db_1.default.query(`SELECT * FROM member WHERE email = ?`, [email]);
    if (user.length === 0) {
        return null;
    }
    return user;
});
exports.login = login;
