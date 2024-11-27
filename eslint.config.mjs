import babel from "@babel/eslint-parser";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": 0,
      "react/display-name": 0,
      "react/jsx-key": 0,
      "react/jsx-no-comment-textnodes": 0,
      "react/jsx-no-duplicate-props": 0,
      "react/jsx-no-target-blank": 0,
      "react/jsx-no-undef": 0,
      "react/jsx-uses-react": 0,
      "react/jsx-uses-vars": 0,
      "react/no-children-prop": 0,
      "react/no-danger-with-children": 0,
      "react/no-deprecated": 0,
      "react/no-direct-mutation-state": 0,
      "react/no-find-dom-node": 0,
      "react/no-is-mounted": 0,
      "react/no-render-return-value": 0,
      "react/no-string-refs": 0,
      "react/no-unescaped-entities": 0,
      "react/no-unknown-property": 0,
      "react/no-unsafe": 0,
      "react/prop-types": 0,
      "react/react-in-jsx-scope": 0,
      "react/require-render-return": 0,
      "react-hooks/exhaustive-deps": 0,
      "no-undef": 0,

      // analysis/correctness
      "import/no-unresolved": "warn",
      "import/namespace": 0,
      "import/named": 0,
      "import/extensions": ["warn", "ignorePackages"],

      // red flags (thus, warnings)
      "import/no-named-as-default": "warn",
      "import/no-named-as-default-member": "warn",
      "import/no-duplicates": "warn",
    },
  },
  {
    languageOptions: {
      parser: babel,
      parserOptions: {
        ecmaVersion: 2020,
      },
    },
  },
];
