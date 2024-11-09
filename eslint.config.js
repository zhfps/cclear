import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'
import pluginSvelte from 'eslint-plugin-svelte'
import parserSvelte from 'svelte-eslint-parser'
import globals from 'globals'

const config = [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...pluginSvelte.configs['flat/recommended'],
  {
    ...eslint.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
        ...globals.node,
        ...globals.es2021,
        ...globals.browser
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      sourceType: 'module'
    }
  },
  {
    files: ['**/*.svelte'],
    plugins: {
      'svelte': pluginSvelte
    },
    languageOptions: {
      parser: parserSvelte,
      parserOptions: {
        parser: tsEslint.parser,
        // 添加以下配置以支持 TypeScript
        sourceType: 'module',
        ecmaVersion: 2022,
        extraFileExtensions: ['.svelte']
      }
    },
    // 确保 Svelte 规则生效
    rules: {
      ...pluginSvelte.configs['flat/recommended'].rules
    }
  },
  {
    rules: {
      ...pluginTypeScript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: false
        }
      ],
      'semi': ['error', 'never']
    }
  }
]

export default config