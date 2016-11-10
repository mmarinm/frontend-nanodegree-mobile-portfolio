/*eslint-env node */

const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  merge = require('merge-stream'),
  imageResize = require('gulp-image-resize'),
  cleanCSS = require('gulp-clean-css'),
  cache = require('gulp-cache');

gulp.task('scripts', function(){
    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
      .pipe(cleanCSS({debug: true}, function(details) {
          console.log(details.name + ': ' + details.stats.originalSize);
          console.log(details.name + ': ' + details.stats.minifiedSize);
      }))
      .pipe(rename('min.css'))
      .pipe(gulp.dest('style/'));
});

gulp.task('imgresize', function () {
  gulp.src('views/images/*')
    .pipe(imageResize({
      width : 100,
      height : 100,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('views/images'));
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
    .pipe(gulp.dest('views/images'));
    return merge(imgfolder, imgviews);
});



gulp.task('watch', function() {
  // place code for your default task here
  gulp.watch('css/*',['minify-css']);
  gulp.watch('img/*', ['images']);
  gulp.watch('js/*.js', ['scripts'])
});
gulp.task('default', ['minify-css', 'imgresize', 'images', 'watch', 'scripts']);
