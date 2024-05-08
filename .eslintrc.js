module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': 0,
    "quotes": ["error", "never"],
    "no-trailing-spaces": ["error", { "skipBlankLines": true, "ignoreComments": true }],
  },
};
