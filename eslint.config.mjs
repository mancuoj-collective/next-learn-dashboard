// @ts-check
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig(
  {
    fileCase: 'kebabCase',
    formatting: {
      braceStyle: '1tbs',
    },
    ignores: ['src/components/ui/**/*.tsx'],
  },
  {
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      'react-refresh/only-export-components': 'off',
      '@eslint-react/no-array-index-key': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': 'warn',
    },
  },
)
