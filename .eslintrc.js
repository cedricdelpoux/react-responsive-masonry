module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
    "jest/globals": true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2019,
  },
  plugins: ["jest"],
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-control-regex": 0,
    "react/prop-types": "off",
    "react/display-name": "off",
  },
}
