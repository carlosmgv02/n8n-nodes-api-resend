module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	env: {
		node: true,
		es6: true,
	},
	extends: [
		'eslint:recommended',
	],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'no-undef': 'off',
	},
};
