var gulp = require('gulp')
    svgo = require('gulp-svgo')
    sass = require('gulp-sass')
    clean = require('gulp-clean-css')
    rename = require('gulp-rename')
    concat = require('gulp-concat')
    uglify = require('gulp-uglify')
    imagemin = require('gulp-imagemin')
    injectsvg = require('gulp-inject-svg')
    prefixer = require('gulp-autoprefixer')
    sourcemaps = require('gulp-sourcemaps');

gulp.task('scss', function () {

  gulp.src('styles/source.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer())
    .pipe(clean())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('min'));
});

gulp.task('js', function () {

  gulp.src(['scripts/base/*.js', 'scripts/vendor/*.js', 'scripts/*.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('min'));
});

gulp.task('min-svg', function () {
  
  gulp.src('images/*.svg')
    .pipe(svgo());
});

gulp.task('docs-resources', function() {

  gulp.src('files/*')
    .pipe(gulp.dest('docs'));

  gulp.src('images/!(*.svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('docs/images'));

  gulp.src('index.html')
    .pipe(injectsvg())
    .pipe(gulp.dest('docs'));
});

gulp.task('docs-code', function() {

  gulp.src('min/styles.min.css')
    .pipe(gulp.dest('docs/min'));

  gulp.src('min/scripts.min.js')
    .pipe(gulp.dest('docs/min'));
});

gulp.task('build', ['js', 'scss', 'docs-resources', 'docs-code'], function () {});

gulp.task('default', ['js', 'scss'], function() {
  gulp.watch('scripts/**/*.js', ['js']);
  gulp.watch('styles/**/*.scss', ['scss']);
});
