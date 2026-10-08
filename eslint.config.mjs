import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

export default tseslint.config(
  { ignores: ['.next/**', '_static/**', 'public/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends('next/core-web-vitals'),
  prettier,
  {
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
)
