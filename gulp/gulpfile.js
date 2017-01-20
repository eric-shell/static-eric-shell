var gulp = require('gulp')
    svgo = require('gulp-svgo')
    sass = require('gulp-sass')
    clean = require('gulp-clean-css')
    rename = require('gulp-rename')
    concat = require('gulp-concat')
    uglify = require('gulp-uglify')
    injectSvg = require('gulp-inject-svg')
    prefixer = require('gulp-autoprefixer')
    sourcemaps = require('gulp-sourcemaps');

gulp.task('scss', function () {
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
  gulp.src(['../scripts/base/*.js', '../scripts/vendor/*.js', '../scripts/*.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('../min'));
});

gulp.task('default', ['js', 'sass'], function() {
  gulp.watch('../scripts/**/*.js', ['js']);
  gulp.watch('../styles/**/*.scss', ['sass']);
});

gulp.task('build', ['js', 'scss'], function() {

  gulp.src('../resume.pdf')
    .pipe(gulp.dest('../dist'))

  gulp.src('../min/styles.min.css')
    .pipe(gulp.dest('../dist/min'))

  gulp.src('../min/scripts.min.js')
    .pipe(gulp.dest('../dist/min'))

  gulp.src('../images/*')
    .pipe(svgo())
    .pipe(gulp.dest('../dist/images'));

  return gulp.src('../index.html')
    .pipe(injectSvg())
    .pipe(gulp.dest('../dist'));
});
