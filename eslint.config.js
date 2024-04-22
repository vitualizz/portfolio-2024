import eslintPluginAstro from 'eslint-plugin-astro'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  ...eslintPluginAstro.configs['flat/recommended']
)
