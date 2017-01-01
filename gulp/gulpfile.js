// For Livereload on Chrome, download the extention:
// https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
// Enable it, allow access to URLs, restart Chrome
// Click the extension icon to begin using it

var gulp = require('gulp')
    sass = require('gulp-sass')
    clean = require('gulp-clean-css')
    rename = require('gulp-rename')
    concat = require('gulp-concat')
    uglify = require('gulp-uglify')
    prefixer = require('gulp-autoprefixer')
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  gulp.src('../styles/source.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer())
    .pipe(clean())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('../min'))
});

gulp.task('js', function () {
  gulp.src(['../scripts/vendor/*.js', '../scripts/*.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('../min'));
});

gulp.task('default', ['js', 'sass'], function() {
  gulp.watch('../scripts/**/*.js', ['js']);
  gulp.watch('../styles/**/*.scss', ['sass']);
});
