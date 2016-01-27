var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var less = require('gulp-less');
var path = require('path');
var minify_css = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

/**
 * 运行服务器程序， 进行调试
 */
gulp.task('server', function() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
    ignore: [
      '.git',
      'node_modules',
      'public',
      'build'
    ],
    verbose: true,
    watch: [
      'config',
      'middlewares',
      'controllers',
      'models',
      'util',
      'routers',
      'services',
      'routers.js',
      'server.js'
    ]
  });
});

gulp.task('default', ['watch', 'server']);