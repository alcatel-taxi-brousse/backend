import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";


export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" }
  },
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended,
  configPrettier,
  {
    plugins: { prettier },
    rules: {
      "no-unused-vars": 'warn',
      "no-undef": 'warn',
      "prettier/prettier": 'error'
    }
  }
];