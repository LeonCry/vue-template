import antfu from '@antfu/eslint-config';

export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: ['.husky'],
  },
  {
    rules: {
      'style/semi': ['warn', 'always'],
      'style/quotes': ['warn', 'single'],
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': ['warn'],
      'eqeqeq': ['error', 'always'],
      'no-console': 'off',
      'antfu/if-newline': 'off',
      'style/max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'style/object-curly-newline': [
        'warn',
        {
          multiline: true,
          minProperties: 6,
        },
      ],
      'style/array-bracket-newline': [
        'warn',
        {
          multiline: true,
          minItems: 6,
        },
      ],
      'vue/max-attributes-per-line': [
        'warn',
        {
          singleline: 1,
          multiline: 1,
        },
      ],
    },
  },
);
