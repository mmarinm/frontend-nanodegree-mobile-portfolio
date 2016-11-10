/*eslint-env node */

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');
const imageResize = require('gulp-image-resize');
const cleanCSS = require('gulp-clean-css');

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
    .pipe(imagemin())
    .pipe(gulp.dest('img'));
    const imgviews = gulp.src('views/images/*')
    .pipe(imagemin())
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
