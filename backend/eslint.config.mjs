// Run this command to generate base config and vs code settings:
// pnpm dlx @antfu/eslint-config@latest

import antfu from "@antfu/eslint-config";

export default antfu({
    type: "app",
    typescript: true,
    formatters: true,
    stylistic: {
        indent: 4,
        semi: true,
        quotes: "double",
    },
    ignores: [
        "**/migrations/**",
    ],
}, {
    rules: {
        // "antfu/top-level-function": "off",
        "eslint-comments/no-unlimited-disable": "off",
        "unused-imports/no-unused-imports": "warn",
        "ts/no-redeclare": "off",
        "ts/consistent-type-definitions": ["error", "type"],
        "no-console": ["warn", { allow: ["warn", "error", "dir"] }],
        "antfu/no-top-level-await": ["off"],
        "node/prefer-global/process": ["off"],
        "node/no-process-env": ["error"],
        "perfectionist/sort-imports": ["error", {
            tsconfigRootDir: ".",
        }],
        "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
        "unicorn/filename-case": ["error", {
            case: "kebabCase",
            ignore: ["README.md"],
        }],
    },
});
