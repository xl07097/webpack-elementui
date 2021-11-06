module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    ecma2020: true,
  },
  extends: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-undef": [0],
    "no-console": [0],
    indent: [2, 2],
    quotes: [2, "single"],
    "no-unused-vars": "off",
  },
};
