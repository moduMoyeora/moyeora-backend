import { body, param, query } from 'express-validator';

export const validateGetPostsByBoardId = [
    param('board_id')
        .isInt().withMessage('게시판 아이디는 숫자여야 합니다.')
        .notEmpty().withMessage('게시판 아이디는 필수 값입니다.')
        .toInt(),
    query('limit')
        .optional()
        .isInt({ min: 1 }).withMessage('limit은 1 이상의 정수여야 합니다.')
        .toInt(),
    query('currentPage')
        .optional()
        .isInt({ min: 1 }).withMessage('currentPage는 1 이상의 정수여야 합니다.')
        .toInt()
    ];

export const validateGetPostById = [
    ...validateGetPostsByBoardId,
    param('id')
        .isNumeric().withMessage('id는 숫자여야 합니다.')
        .toInt(),
];