'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');

gulp.task('compile', function () {
    return gulp.src('./src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('watch', ['compile'], function () {
  return nodemon({
                 script: 'server.js',
                 ext: 'js',
                 watch: 'src',
                 tasks: ['compile']
               });
});

//gulp.start.apply(gulp, ['compile', 'watch']);
gulp.task('default', ['compile', 'watch']);