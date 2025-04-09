import { defineConfig } from "eslint/config";
import globals, { node } from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser"
import unusedImports from "eslint-plugin-unused-imports"
import airbnbBase from "eslint-config-airbnb-base"
import airbnbBaseTypescript from "eslint-config-airbnb-base-typescript"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { parser: tsParser },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "unused-imports": unusedImports
    },
    rules: {
      ...airbnbBase.rules,
      ...airbnbBaseTypescript.rules,
      "no-unused-vars": "off",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePettern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ]
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", "ts", "jsx", "tsx"]
        }
      }
    }
  },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.node } },
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  tseslint.configs.recommended,
]);