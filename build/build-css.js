/* eslint-disable @typescript-eslint/no-var-requires */

const { src, dest } = require("gulp");
const gulpclean = require("gulp-clean");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");

const cssclean = (source) =>
    function clean() {
        return src(source).pipe(gulpclean());
    };

const build = (source) =>
    function build() {
        return src(source)
            .pipe(postcss()) // This uses config from postcss.config.js
            .on("error", function (errorInfo) {
                console.log(errorInfo.toString());
                this.emit("end");
            })
            .pipe(
                rename(
                    // ../packages/__my-package__/src/styles.scss => ../packages/__my-package__/styles.css
                    (
                        { basename, dirname } // e.g. { dirname: 'Button/src', basename: 'styles', extname: '.scss' }
                    ) => ({
                        basename,
                        dirname: `${dirname.split("/")[0]}/dist`,
                        extname: ".css",
                    })
                )
            )
            .pipe(dest("./packages/"));
    };

module.exports = {
    clean: cssclean,
    build,
};
