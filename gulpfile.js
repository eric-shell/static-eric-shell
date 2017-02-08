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

  console.log('min-svg has run');
});

gulp.task('docs-svg', function(done) {
  
  gulp.src('index.html')
    .pipe(injectsvg())
    .pipe(gulp.dest('docs'));

  done();

  console.log('docs-svg has run');
});

gulp.task('docs-img', function() {
  
  gulp.src('images/!(*.svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('docs/images'));

  console.log('docs-img has run');
});

gulp.task('docs-files', function() {

  gulp.src('files/*')
    .pipe(gulp.dest('docs'));

  console.log('docs-files has run');
});

gulp.task('docs-code', function() {

  gulp.src('min/styles.min.css')
    .pipe(gulp.dest('docs/min'));

  gulp.src('min/scripts.min.js')
    .pipe(gulp.dest('docs/min'));

  console.log('docs-code has run');
});

gulp.task('pre-build', function () {

  return del.sync(['docs/!(*CNAME)']);
  console.log('pre-build has run');
});

gulp.task('default', ['js', 'scss'], function() {

  gulp.watch('scripts/**/*.js', ['js']);
  gulp.watch('styles/**/*.scss', ['scss']);
  gulp.watch('index.html', ['build']);
});

gulp.task('build', function(done) {
  runsequence('pre-build', 'js', 'scss', 'docs-img', 'docs-files', 'docs-code', 'docs-svg', function() {
    console.log('Everything has run');
    done();
  });
});
