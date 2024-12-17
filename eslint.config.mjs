import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config} */
export default [
  {
    files: ["src/**/*.ts"],
    ignores: ['node_modules/', 'dist/'],
    languageOptions: {
      parser: tsParser, // TypeScript 파서를 사용
      sourceType: 'module', // 모듈 시스템 설정
      globals: { ...globals.node }, // Node 글로벌 변수
    },
    plugins: {
      prettier: prettierPlugin,
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // 기본 JavaScript 권장 설정
      ...tseslint.configs.recommended.rules, // TypeScript 권장 설정
      'no-console': 'warn', // `console.log` 사용에 대한 경고
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
];
