// Gulp Workflow specific to BootStrap builds requiring source code for custom adjustments
const { src, watch, series, dest } = require("gulp");
const purgeCSS = require("gulp-purgecss");
const sass = require("gulp-dart-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sourceMap = require("gulp-sourcemaps");
const bs = require("browser-sync");
const concat = require("gulp-concat");

function sassTask() {
  return src( "scss/**/*.scss" )
    .pipe( sass().on( "error", sass.logError ) )
    .pipe( purgeCSS({
      content: ["index.html"]
    }))
    .pipe( postcss([autoprefixer()]) )
    .pipe( concat("main.css") )
    .pipe( dest(".") )
    .pipe( bs.reload({stream: true}) );
}

function htmlTask() {
  return src("index.html")
    .pipe( bs.reload({stream: true}) );
}

function watchTask() {
  bs.init({
    server: {
        baseDir: "."
    }
  });
  watch( ["scss/**/*.scss", "index.html", "main.js"], series(sassTask, htmlTask));
  watch("*.html").on("change", bs.reload);
}

exports.default = series(sassTask, htmlTask, watchTask);