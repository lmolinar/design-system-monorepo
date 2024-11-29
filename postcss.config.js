/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = () => ({
    parser: "postcss-scss",
    plugins: [
        require("@csstools/postcss-sass")({ includePaths: ["node_modules"] }),
        require("autoprefixer")(),
        require("postcss-preset-env")(),
        require("postcss-discard-comments")({ removeAll: true }),
        require("postcss-csso")(),
    ],
});
