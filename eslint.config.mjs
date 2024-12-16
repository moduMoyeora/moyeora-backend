import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'], // 적용 파일 확장자 설정
    languageOptions: {
      parser: tsParser, // TypeScript 파서를 사용
      sourceType: 'module', // 모듈 시스템 설정
      globals: { ...globals.browser, ...globals.node }, // 브라우저 및 Node 글로벌 변수
    },
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      '@typescript-eslint': tseslint,
    },
    settings: {
      react: {
        version: 'detect', // React 버전을 자동 감지
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // JavaScript 권장 규칙 포함
      ...tseslint.configs.recommended.rules, // TypeScript 권장 규칙 포함
      'prettier/prettier': 'error', // Prettier 규칙을 ESLint 에러로 표시
    },
  },
  {
    ignores: ['node_modules/', 'dist/'], // 검사 제외 폴더
  },
];
