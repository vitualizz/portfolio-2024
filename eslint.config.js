import eslintPluginAstro from 'eslint-plugin-astro'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.astro/',
      '.vercel/',
      'coverage/',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock',
      '.env',
      '.env.*'
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    files: ['src/env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': [
        'error',
        { path: 'always', types: 'always', lib: 'never' }
      ]
    }
  }
)
