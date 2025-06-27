export default {
  '**/*.{js,jsx,ts,tsx,json,vue}': filenames => [
    ...filenames.map(filename => `echo "eslint for '${filename}'..."`),
    `npx eslint --fix ${filenames.map(filename => `"${filename}"`).join(' ')}`,
  ],
};
