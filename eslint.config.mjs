// @ts-check
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig(
  {
    lessOpinionated: true,
    fileCase: 'kebabCase',
    react: 'next',
    preferESM: false,
    tailwindCSS: true,
    unocss: false,
    typeChecked: 'essential',
    ignores: ['src/components/ui/**/*.tsx'],
  },
  {
    rules: {
      'unicorn/expiring-todo-comments': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'react-refresh/only-export-components': 'off',
      '@eslint-react/no-array-index-key': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': 'warn',
    },
  },
)
