'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss =  require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');


gulp.task('sass', function(){
    gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function(){
    gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('browser-sync', function(){
    var files = ['*.html', './css/*.css', './img/*.{png, jpg, gif}', './js/*.js']
    browserSync.init(files, {
        server:{
            baseDir: './'
        }
    });
});

gulp.task('default', ['browser-sync'], function(){
    gulp.start('sass:watch');
});

gulp.task('clean', function(){
    return del(['dist']);
});

gulp.task('imagemin', function(){
    return gilp.src('./images/*.{png, jpg, jpeg, gif}')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('usemin', function(){
    return gulp.src('./*.html')
            .pipe(flatmap(function(stream, file){
                return stream
                        .pipe(usemin({
                            css: [rev()],
                            html: [function(){return htmlmin({collapseWhitespace: true})}],
                            js: [uglify(), rev()],
                            inlinejs: [uglify()],
                            inlinecss: [cleanCss(), 'concat']
                        }))
            }))
            .pipe(gulp.dest('./dist'));
});

gulp.task('build', function(){
    gulp.start('copyfonts', 'imagemin', 'usemin');
});