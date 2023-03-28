/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	root: true,
	env: {
		node: true,
		es2021: true,
		browser: true
	},
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/eslint-config-typescript",
		"@vue/eslint-config-prettier/skip-formatting",
		"@vue/typescript/recommended"
	],
	overrides: [
		{
			files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
			extends: ["plugin:cypress/recommended"]
		}
	],
	parserOptions: {
		ecmaVersion: "latest"
	},
	rules: {
		"no-unused-vars": "off",
		"no-console": "warn",
		"no-debugger": "error",
		"vue/component-name-in-template-casing": [
			"error",
			"kebab-case",
			{ registeredComponentsOnly: false }
		],
		"vue/component-definition-name-casing": ["error"],
		"vue/match-component-file-name": "error",
		"@typescript-eslint/consistent-type-imports": "warn",

		// Disabled as has questionable value and/or parity with previous rule set.
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-parameter-properties": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/explicit-member-accessibility": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/ban-ts-ignore": "off",
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"vue/multi-word-component-names": "off",

		// Custom rules not part of the plugin set
		"vue/block-lang": [
			"error",
			{
				script: {
					lang: "ts"
				}
			}
		]
	}
};
