var gulp = require('gulp')
    del = require('del')
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
    sourcemaps = require('gulp-sourcemaps')
    fileinclude = require('gulp-file-include');

// Minify tasks
gulp.task('min-scss', function () {
  gulp.src('scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer())
    .pipe(clean())
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('docs/min'));
});

gulp.task('min-js', function () {
  gulp.src(['js/base/*.js', 'js/vendor/*.js', 'js/*.js'])
    .pipe(uglify().on('error', function(e){console.log(e);}))
    .pipe(concat('main.js'))
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('docs/min'));
});

gulp.task('min-svg', function () {
  gulp.src('images/*.svg')
    .pipe(svgo());
});

// Individual build tasks
gulp.task('pre-build', function () {
  return del(['docs/!(*CNAME)']);
});

gulp.task('build-img', function() {
  return gulp.src('images/!(*.svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('docs/images/'));
});

gulp.task('build-files', function() {
  return gulp.src('files/*')
    .pipe(gulp.dest('docs/'));
});

gulp.task('build-index', function() {
  return gulp.src('html/index.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'html/partials'
    }))
    .pipe(injectsvg())
    .pipe(gulp.dest('docs/'));
});

// Full build task
gulp.task('build', function(done) {
  runsequence('pre-build', ['min-js', 'min-scss'], ['build-img', 'build-files'], 'build-index', function() {
    done();
  });
});

// Watch tasks
gulp.task('default', ['min-js', 'min-scss'], function() {
  gulp.watch('js/**/*.js', ['min-js']);
  gulp.watch('scss/**/*.scss', ['min-scss']);
  gulp.watch('html/**/*.html', ['build']);
  gulp.watch('index.html', ['build']);
});
