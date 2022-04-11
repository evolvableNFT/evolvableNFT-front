module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'plugin:vue/recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': ['warn', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        // trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
      },
    ],
    // 'vue/max-len': [
    //   'warn',
    //   {
    //     code: 140,
    //     template: 140,
    //     tabWidth: 2,
    //     comments: 80,
    //     ignorePattern: '',
    //     ignoreComments: false,
    //     ignoreTrailingComments: false,
    //     ignoreUrls: false,
    //     ignoreStrings: false,
    //     ignoreTemplateLiterals: false,
    //     ignoreRegExpLiterals: false,
    //     ignoreHTMLAttributeValues: false,
    //     ignoreHTMLTextContents: false,
    //   },
    // ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true,
      },
    },
  ],
}
