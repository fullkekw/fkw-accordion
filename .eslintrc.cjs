module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    indent: ["error", 2, {
      "SwitchCase": 1
    }],
    "no-unused-vars": ["off", {
      vars: "all",
      args: "after-used",
      ignoreRestSiblings: false
    }],
    semi: ["warn", "always"],
    "prefer-const": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "no-empty": "warn",
    "react-hooks/exhaustive-deps": "off"
  }
}
