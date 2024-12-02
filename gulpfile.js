/* eslint-disable @typescript-eslint/no-var-requires */

const { series, task, watch } = require("gulp");

const { clean: cssClean, build: cssBuild } = require("./build/build-css");

/*** BUILD CSS ***/

const CSS_SRC = "packages/*/src/*.scss";
const CSS_DIST_SRC = `packages/*/dist/*.css`;
const CSS_DIST_SRC_LEGACY = "packages/*/styles.css";

task("css:clean", cssClean);
task("css:build", series(cssClean(CSS_DIST_SRC), cssBuild(CSS_SRC)));
task("css:build:watch", () => {
    // eslint-disable-next-line no-unused-expressions
    watch(CSS_SRC, cssBuild(CSS_SRC));
});
