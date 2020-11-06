// Gulp Workflow specific to BootStrap builds requiring source code for custom adjustments
const { src, watch, series, dest } = require("gulp");
const purgeCSS = require("gulp-purgecss");
const autoprefixer = require("autoprefixer");
const sass = require("gulp-dart-sass");
const bs = require("browser-sync");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");

function sassTask() {
  return src( "scss/**/*.scss" )
    .pipe( sass().on( "error", sass.logError ) )
    .pipe( concat("main.css") )
    .pipe( postcss([autoprefixer("last 4 versions")]) )
    .pipe( purgeCSS({
      content: ["index.html"]
    }))
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