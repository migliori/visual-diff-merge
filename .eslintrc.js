module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "unused-imports",
    "import"
  ],
  "rules": {
    // Identify unused imports
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ],

    // Find unused variables and functions
    "no-unused-vars": "off", // Turned off in favor of unused-imports/no-unused-vars

    // Identify console statements (potential debug code to clean up)
    "no-console": ["warn", { allow: ["warn", "error"] }], // Warn about console.log but allow console.warn and console.error

    // Make sure imports are properly ordered
    "import/order": ["warn", {
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      "newlines-between": "always"
    }]
  }
};
