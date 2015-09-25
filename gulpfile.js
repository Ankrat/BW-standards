// Load plugins
var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    fileinclude  = require('gulp-file-include'),
    markdown     = require('markdown'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    minifyHTML   = require('gulp-minify-html'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    cache        = require('gulp-cache'),
    del          = require('del'),
    reload       = browserSync.reload,
    inject       = require('gulp-inject');


// HTML
gulp.task('html', function() {
  return gulp.src(['src/{,*/}*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      filters: {
        markdown: markdown.parse
      }
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyHTML({conditionals: true}))
    .pipe(gulp.dest('dist/minified-statics/'));
});

// styleguide HTML generate
gulp.task('sg-html', function () {
  return gulp.src(['src/style-guide/index.html'])
        .pipe(inject(gulp.src(['src/patternlab/**/*.htm']), {
          starttag: '<!-- inject:atoms:{{ext}} -->',
          transform: function (filePath, file) {
            return file.contents.toString('utf8')
          }
        }))
        .pipe(gulp.dest('dist/style-guide'));
});

// Styles
gulp.task('styles', function() {
  return gulp.src('src/sass/{,*/}*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({ style: 'expanded', errLogToConsole: true}))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('dist/stylesheet'))
    .pipe(gulp.dest('dist/stylesheet/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/minified-statics/styles'));
});

// styleguide Style generate
gulp.task('sg-styles', function() {
  return gulp.src(['src/patternlab/**/*.scss'])
        .pipe(sass({ style: 'expanded', errLogToConsole: true}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename("style-guide/stylesheet/sg.css"))
        .pipe(gulp.dest('dist'));
});


// Scripts
gulp.task('scripts', function() {
  return gulp.src(['src/scripts/{,*/}*.js', '!src/scripts/vendor/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/minified-statics/scripts'));
});

// Vendor Scripts
gulp.task('vendor', function() {
  return gulp.src('src/scripts/vendor/*.js')
  // .pipe(concat('polyfill.min.js'))
  .pipe(gulp.dest('dist/scripts/vendor'))
});



// Images
gulp.task('images', function() {
  return gulp.src(['src/images/**/*', '!src/images/flags/*'])
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(gulp.dest('dist/minified-statics/images'));
});


// Clean
gulp.task('clean', function(cb) {
    del(['dist/*.html', 'dist/styles', 'dist/scripts'], cb);
});



// Serve
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
});



// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'vendor', 'images', 'html', 'sg-html', 'sg-styles', 'serve', 'watch');
});



// Watch
gulp.task('watch', function() {

  // Watch .html/.htm files
  gulp.watch(['src/{,*/}*.{htm,html}','!src/style-guide/{,*}.{htm,html}', '!src/patternlab/**/*.{htm,html}'], ['html']);
  gulp.watch(['src/style-guide/{,*}.{htm,html}', 'src/patternlab/**/*.htm'], ['sg-html']);

  // Watch .scss files
  gulp.watch('src/sass/{,*/}*.scss', ['styles']);
  gulp.watch('src/patternlab/**/*.scss', ['sg-styles']);

  // Watch .js files
  gulp.watch('src/scripts/{,*/}*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/{,*/}*', ['images']);

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', reload);

});
