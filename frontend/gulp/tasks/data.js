'use strict';

var config      = require('../config');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var browserSync = require('browser-sync');

gulp.task('data', function() {

  return gulp.src(config.data.src)
    .pipe(changed(config.data.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.data.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));

});
