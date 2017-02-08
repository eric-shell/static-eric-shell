var gulp = require('gulp')
    del = require('del');
    svgo = require('gulp-svgo')
    sass = require('gulp-sass')
    clean = require('gulp-clean-css')
    rename = require('gulp-rename')
    concat = require('gulp-concat')
    uglify = require('gulp-uglify')
    imagemin = require('gulp-imagemin')
    runsequence = require('run-sequence')
    injectsvg = require('gulp-inject-svg')
    prefixer = require('gulp-autoprefixer')
    sourcemaps = require('gulp-sourcemaps');

// Minify tasks
gulp.task('min-scss', function () {
  gulp.src('styles/source.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer())
    .pipe(clean())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('min'));
});

gulp.task('min-js', function () {
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

// Build tasks
gulp.task('pre-build', function () {
  return del(['docs/!(*CNAME)']);
});

gulp.task('build-img', function() {
  return gulp.src('images/!(*.svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('docs/images'));
});

gulp.task('build-code', function() {
  return gulp.src(['min/styles.min.css', 'min/scripts.min.js'])
    .pipe(gulp.dest('docs/min'));
});

gulp.task('build-files', function() {
  return gulp.src('files/*')
    .pipe(gulp.dest('docs'));
});

gulp.task('build-index', function() {
  return gulp.src('index.html')
    .pipe(injectsvg())
    .pipe(gulp.dest('docs'));
});

// Watch task
gulp.task('default', ['js', 'scss'], function() {
  gulp.watch('scripts/**/*.js', ['min-js']);
  gulp.watch('styles/**/*.scss', ['min-scss']);
});

// Build task
gulp.task('build', function(done) {
  runsequence('pre-build', ['build-img', 'build-code', 'build-files'], 'build-index', function() {
    done();
  });
});
