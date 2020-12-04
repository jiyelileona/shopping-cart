const {src, dest, series, parallel} = require('gulp');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');

function clean() {
  return del('dist');
}

function htmlTask() {
  return src('src/*.html').pipe(dest('dist'));
}

function stylesTask() {
  return src([
    'src/css/normalize.css',
    'src/css/style.css',
    'src/css/color-change1.css',
    'src/css/color-change2.css',
    'src/css/color-change3.css',
  ])
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'));
}

function scriptsTask() {
  return src(['src/js/courses.js', 'src/js/cart.js'])
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'));
}

function imagesTask() {
  return src('src/images/*').pipe(imagemin()).pipe(dest('dist/images'));
}

exports.html = htmlTask;
exports.styles = stylesTask;
exports.scripts = scriptsTask;
exports.default = series(clean, htmlTask, parallel(imagesTask, scriptsTask, stylesTask));
