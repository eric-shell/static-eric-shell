var gulp = require('gulp'),
  del = require('del'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean-css'),
  plumber = require('gulp-plumber'),
  imagemin = require('gulp-imagemin'),
  htmlclean = require('gulp-htmlclean'),
  runsequence = require('run-sequence'),
  prefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  fileinclude = require('gulp-file-include'),
  browserSync = require('browser-sync').create();

gulp.task('pre-build', function () {
  return del(['docs/!(*CNAME)']);
});

gulp.task('min-scss', function () {
  gulp.src('scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer())
    .pipe(clean())
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('docs/min/css'))
    .pipe(browserSync.stream());
});

gulp.task('min-js', function () {
  gulp.src(['js/vendor/*.js', 'js/modules/*.js', 'js/components/*.js'])
    .pipe(uglify().on('error', function(e){console.log(e);}))
    .pipe(concat('main.js'))
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('docs/min/js'))
    .pipe(browserSync.stream());
});

gulp.task('min-html', function() {
  return gulp.src('html/*.html')
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'html'
    }))
    .pipe(htmlclean())
    .pipe(gulp.dest('docs'))
    .pipe(browserSync.stream());
});

gulp.task('move-files', function() {
  return gulp.src('files/**/*')
    .pipe(gulp.dest('docs/files'));
});

gulp.task('min-img', function(done) {
  gulp.src('images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: true}
        ]
      })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest('docs/images'))
    .on('end', function () { done(); })
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
  browserSync.init({
    server: "./docs",
    port: 1110,
    ui: {
      port: 1111
    }
  });
});

// Full build task
gulp.task('build', function(done) {
  runsequence('pre-build', ['min-scss', 'min-js', 'min-html', 'move-files'], 'min-img', 'serve', function() {
    done();
  });
});

// All Watch tasks
gulp.task('default', ['build'], function() {
  gulp.watch('js/**/*.js', ['min-js']);
  gulp.watch('scss/**/*.scss', ['min-scss']);
  gulp.watch('html/**/*.html', ['min-html']);
  gulp.watch('images/**/*', ['min-img']);
  gulp.watch('files/**/*', ['move-files']);
});
