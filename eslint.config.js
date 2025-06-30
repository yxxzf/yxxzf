import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
// import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
      globals: {
        ...globals.browser, // 浏览器全局变量 (window, document等)
        ...globals.node, // Node.js 全局变量 (process, require等)
      },
    },
    ignores: ['**/dist/**', '**/node_modules/**'], // 忽略的目录
    rules: {
      // eslint（https://eslint.bootcss.com/docs/rules/）
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unexpected-multiline': 'error', // 禁止空余的多行
      'no-useless-escape': 'off', // 禁止不必要的转义字符
      //'prettier/prettier': 'error', // 将格式问题转为错误

      // typeScript (https://typescript-eslint.io/rules)
      '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
      '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
      '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
      '@typescript-eslint/semi': 'off',

      // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
      'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
      'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
      'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
    },
  },
])

// 2. Prettier兼容配置
// const prettierConfig = {
//   // 应用Prettier规则到所有文件
//   files: ["**/*.{js,jsx,ts,tsx,vue}"],
//   plugins: {
//     prettier: prettierPlugin
//   },
//   rules: {
//     // 关键配置：启用Prettier作为ESLint规则
//     "prettier/prettier": [
//       "error",
//       {
//         // 与.prettierrc设置保持一致
//         semi: true,
//         singleQuote: true,
//         trailingComma: "es5",
//         printWidth: 100,
//         tabWidth: 2,
//         endOfLine: "auto"
//       }
//     ],

//     // 禁用所有与Prettier冲突的ESLint格式规则
//     "arrow-body-style": "off",
//     "prefer-arrow-callback": "off",
//     // 更多需要禁用的规则...
//   }
// };
// export {
//   baseConfig,
//   prettierConfig
// }
