const gulp = require('gulp');
const less = require('gulp-less');
const smith = require('gulp.spritesmith');
const nodemon = require('gulp-nodemon');
const njk = require('gulp-nunjucks-render');

gulp.task('watch', function() {
  gulp.watch('assets/sprites/*.png', ['sprites']);
  gulp.watch('assets/less/**/!(_)*.less', ['less']);
});

gulp.task('sprites', function() {
  var sprite = gulp.src('assets/sprites/*.png').pipe(smith({
    imgName: 'img_sprite.png',
    cssName: '_sprite.less',
    imgPath: '/img/img_sprite.png'

  }));
  sprite.img.pipe(gulp.dest('static/images'));
  sprite.css.pipe(gulp.dest('assets/less'));
});

gulp.task('less', function() {
  return gulp.src('assets/less/**/!(_)*.less')
    .pipe(less())
    .pipe(gulp.dest('static/css'));
});

gulp.task('html', function() {
  gulp.src('views/pages/**/*.njk')
      .pipe(njk({
        path: 'views/'
      }))
      .pipe(gulp.dest('dist/'));
});

gulp.task('copy', function() {
  gulp.src('static/**/*')
      .pipe(gulp.dest('dist/'))
});

gulp.task('server', function() {
  nodemon({
    script: 'server.js',
    tasks: ['sprites', 'less'],
    ext: 'js',
  });
});

gulp.task('default', ['server', 'watch']);
gulp.task('dist', ['html', 'copy']);