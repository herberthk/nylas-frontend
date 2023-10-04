module.exports = {
  extends: ['mantine',
    'plugin:jest/recommended',
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "next/core-web-vitals",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "prettier",
    "plugin:security/recommended",
],
  plugins: ['testing-library', 'jest',
  "unused-imports",
  "@typescript-eslint",
  "prefer-arrow",
  "filename-rules",
  "react-hooks",
  "react",
  "simple-import-sort",
],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    // quotes: ['error', 'single'],
    "no-console": "warn",
    "no-empty": "warn",
    "prettier/prettier": "error",

    "react/jsx-key": "error",
    // Allow _ for no-unused-variables https://stackoverflow.com/a/64067915/8930600
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_+",
        varsIgnorePattern: "^_+",
        caughtErrorsIgnorePattern: "^_+",
      },
    ],
    // "@typescript-eslint/no-unnecessary-condition": "error",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/explicit-module-boundary-types": [
      "error",
      {
        allowArgumentsExplicitlyTypedAsAny: true,
      },
    ],
    "@typescript-eslint/consistent-type-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    // https://stackoverflow.com/a/64258560/8930600
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    "func-style": ["error", "expression", { allowArrowFunctions: true }],
    // https://reactjs.org/docs/hooks-rules.html#eslint-plugin
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
    // https://stackoverflow.com/a/67652059/8930600
    // "consistent-return": "off",
    // "no-unused-expressions": "off",
    // "@typescript-eslint/no-unused-expressions": "error",

    "require-await": "off",
    "@typescript-eslint/require-await": "error",

    /** https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md */
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],

    "@typescript-eslint/no-non-null-assertion": "error",

    "@typescript-eslint/no-explicit-any": "error",

    /** https://github.com/eslint-community/eslint-plugin-security/issues/21#issuecomment-1157887653 */
    "security/detect-object-injection": "off",

    "@typescript-eslint/switch-exhaustiveness-check": "error",

    // "mongoidcompare/no-triple-equality-check": "error",

    "max-lines": ["error", 300],

    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "typeLike",
        format: ["PascalCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "parameter",
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow",
      },
      {
        /** We must support PascalCase because both zod schemas and unstated-next objects do use it */
        selector: "variable",
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        leadingUnderscore: "allow",
      },
    ],
    // "import/extensions": "off",
    // "import/no-relative-parent-imports": "error",
    "filename-rules/match": [
      "error",
      /^([a-z0-9.]+-)*[a-z0-9.eslintrc.js]+(?:\..*)?$/i,
    ],

    // increase the severity of rules so they are auto-fixable
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
