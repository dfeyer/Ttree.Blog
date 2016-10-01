var gulp = require('gulp');
var less = require('gulp-less');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Compile LESS files from /less into /css
gulp.task('less', function () {
  return gulp.src('Resources/Private/Styles/clean-blog.less')
    .pipe(less())
    .pipe(gulp.dest('Resources/Public/Styles'))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function () {
  return gulp.src('Resources/Public/Styles/clean-blog.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('Resources/Public/Styles'))
});

// Minify JS
gulp.task('minify-js', function () {
  return gulp.src('Resources/Public/JavaScript/clean-blog.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('Resources/Public/JavaScript'))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function () {
  gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
    .pipe(gulp.dest('Resources/Public/Vendor/bootstrap'));

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('Resources/Public/Vendor/jquery'));

  gulp.src([
    'node_modules/font-awesome/**',
    '!node_modules/font-awesome/**/*.map',
    '!node_modules/font-awesome/.npmignore',
    '!node_modules/font-awesome/*.txt',
    '!node_modules/font-awesome/*.md',
    '!node_modules/font-awesome/*.json'
  ])
    .pipe(gulp.dest('Resources/Public/Vendor/font-awesome'))
});

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js', 'copy']);

// Dev task
gulp.task('dev', ['less', 'minify-css', 'minify-js'], function () {
  gulp.watch('Resources/Private/Styles/*.less', ['less']);
  gulp.watch('Resources/Public/Styles/*.css', ['minify-css']);
  gulp.watch('Resources/Public/JavaScript/*.js', ['minify-js']);
});
