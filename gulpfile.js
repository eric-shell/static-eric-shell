const { src, dest, parallel, series, watch } = require('gulp')
const del = require('del')
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const clean = require('gulp-clean-css')
const plumber = require('gulp-plumber')
const imagemin = require('gulp-imagemin')
const htmlclean = require('gulp-htmlclean')
const prefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const fileinclude = require('gulp-file-include')
const browsersync = require('browser-sync').create()

function preBuild() {
  return del(['docs/!(*CNAME)'])
}

function moveFiles() {
  return src('files/**/*')
    .pipe(dest('docs/files'))
}

function minScss() {
  return src('scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer())
    .pipe(clean())
    .pipe(rename('styles.min.css'))
    .pipe(dest('docs/min/css', { sourcemaps: '.' }))
    .pipe(browsersync.stream())
}

function minJs() {
  return src(['js/vendor/*.js', 'js/components/*.js'])
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(rename('scripts.min.js'))
    .pipe(dest('docs/min/js'))
    .pipe(browsersync.stream())
}

function minHtml() {
  return src(['html/*.html'])
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'html'
    }))
    .pipe(htmlclean())
    .pipe(dest('docs'))
    .pipe(browsersync.stream())
}

function minImg() {
  return src('images/**/*.{gif,jpg,jpeg,png,svg}')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({progressive: true}),
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
    .pipe(dest('docs/images'))
    .pipe(browsersync.stream())
}

function serve(done){
  browsersync.init({
    server: {
      baseDir: './docs'
    }
  })
  done()
}

// All Watch tasks
watch('js/**/*.js', minJs)
watch('scss/**/*.scss', minScss)
watch('html/**/*.html', minHtml)
watch('images/**/*', minImg)
watch('files/**/*', moveFiles)

// Full build functionality
exports.default = series(preBuild, parallel(minScss, minJs, minHtml, moveFiles), minImg, serve)
