import antfu from '@antfu/eslint-config';

export default antfu(
  {
    vue: true,
    typescript: true,
  },
  {
    rules: {
      'style/semi': ['warn', 'always'],
      'style/quotes': ['warn', 'single'],
      'no-unused-vars': ['warn'],
      'eqeqeq': ['error', 'always'],
      'no-console': 'off',
    },
  },
);
