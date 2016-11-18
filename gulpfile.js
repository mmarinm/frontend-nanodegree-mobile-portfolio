/*eslint-env node */

const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  merge = require('merge-stream'),
  imageResize = require('gulp-image-resize'),
  browserSync = require('browser-sync').create();
  cleanCSS = require('gulp-clean-css'),
  cache = require('gulp-cache'),
  concatCss = require('gulp-concat-css');

browserSync.init({
    server:"./"
});
browserSync.stream();

gulp.task('scripts', function(){
    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('minify-css', function() {
    gulp.src('css/*.css')
    .pipe(concatCss('min.css'))
    .pipe(cleanCSS({debug: true}, function(details) {
          console.log(details.name + ': ' + details.stats.originalSize);
          console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('imgresize', function () {
  gulp.src('views/images/*')
    .pipe(imageResize({
      width : 100,
      height : 100,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('images', function(){
    const imgfolder = gulp.src('img/*')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('img'));
    const imgviews = gulp.src('views/images/*')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist'));
    return merge(imgfolder, imgviews);
});



gulp.task('watch', function() {
  // place code for your default task here
  gulp.watch('css/*',['minify-css']);
  gulp.watch('img/*', ['images']);
  gulp.watch('js/*.js', ['scripts'])
});
gulp.task('default', ['minify-css', 'imgresize', 'images', 'watch', 'scripts']);
