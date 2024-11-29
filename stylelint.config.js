module.exports = {
    "extends": ["stylelint-prettier/recommended"],
    "plugins": ["stylelint-prettier"],
    "customSyntax": 'postcss-scss',
    "rules": {
        "prettier/prettier": true,
        "indentation": 4,
        "string-quotes": 'double'
    }
};
