import jsPlugin from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js: jsPlugin },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.jest } },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      // "prettier/prettier": "error",
    },
  },
]);
