module.exports =  {
    parser:  '@typescript-eslint/parser',
    extends:  [
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions:  {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    rules:  {
        //
    }
};
