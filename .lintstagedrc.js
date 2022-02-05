const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const prettierCommand = 'prettier --write --ignore-unknown';

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, prettierCommand],
  '**/!(*.{js,jsx,ts,tsx})': prettierCommand,
};
