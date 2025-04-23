import tsESLint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
export default ([
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, // 添加浏览器全局变量
        ...globals.node,    // 添加Node.js全局变量
        ...globals.jest,    // 添加Jest全局变量
        wx: 'readonly', // 解决 wx 未定义问题
        my: 'readonly' // 解决 my 未定义问题
      }
    },
    plugins: {
      '@typescript-eslint': tsESLint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { 
          argsIgnorePattern: '^_', // 忽略以 _ 开头的未使用参数
          varsIgnorePattern: '^_'  // 忽略以 _ 开头的未使用变量
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-unused-vars': 'off' // 禁用基础规则，使用 TypeScript 的规则
    }
  },
  prettier,
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      '**/*.d.ts'
    ]
  }
]);