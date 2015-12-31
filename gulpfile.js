'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require('gulp-notify'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    connect = require('gulp-connect'),
	critical = require('critical');

var env = process.env.NODE_ENV || 'development';

var config = {
	sassPath: './development/scss',
	bowerDir: './bower_components',
	dest: './assets'
};

/* Bower task, install all the bower dependencies */
gulp.task('bower', function () {
	return bower()
		.pipe(gulp.dest(config.bowerDir));
});

/* Copy the fonts file from fontawesome to the assets directory */
gulp.task('icons', function () {
	return gulp.src([
		config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*',
		config.bowerDir + '/font-awesome/fonts/**.*'
	])
		.pipe(gulp.dest(config.dest + '/fonts'));
});

/* Complie cssc to a css file */
gulp.task('css', function () {
	var configCss = {
		loadPath: [
			config.bowerDir,
			config.bowerDir + '/bootstrap-sass/assets/stylesheets',
			config.bowerDir + '/font-awesome/scss',
		]
	};
	if (env === 'production') {
		configCss.style = 'compressed';
	}
	return sass(config.sassPath + '/styles.scss', configCss)
		.on('error', notify.onError(function (error) {
		return 'Error: ' + error.message;
	}))
		.pipe(gulp.dest(config.dest + '/css'))
		.pipe(connect.reload());
});

gulp.task('inline-critical', ['css'], function (cb) {
	critical.generate({
		inline: true,
		base: './',
		src: './development/index.html',
		dest: './index.html',
		minify: true,
		width: 320,
		height: 480
	});
	cb();
});

/* Concat, minify javascript files */
gulp.task('js', function () {
	return gulp.src([
		config.bowerDir + '/jquery/dist/jquery.js',
		config.bowerDir + '/bootstrap/js/transition.js',
		config.bowerDir + '/bootstrap/js/modal.js',
		config.bowerDir + '/d3/d3.js',
		config.bowerDir + '/underscore/underscore.js',
		config.bowerDir + '/backbone/backbone.js',
		config.bowerDir + '/backbone.bootstrap-modal/src/backbone.bootstrap-modal.js',
		config.bowerDir + '/backbonefire/dist/backbonefire.js',
		config.bowerDir + '/backbone.paginator/lib/backbone.paginator.js',
		'./development/js/*.js',
		'./development/js/models/*.js',
		'./development/js/collections/*.js',
		'./development/js/views/*.js',
		'./development/js/routers/*.js'
	])
		.pipe(concat('app.js'))
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(config.dest + '/js'))
		.pipe(connect.reload());
});

/* Watch task: run the specified task(s) when some file(s) change*/
gulp.task('watch', function () {
	gulp.watch('./development/js/**/*.js', ['js']);
	gulp.watch(['./development/index.html', './development/scss/*.scss'], ['inline-critical']);
});

gulp.task('connect', function () {
	connect.server({
		port: 3000,
		livereload: true
	});
});

/* Define the default task */
gulp.task("default", ['icons', 'inline-critical', 'js', 'connect', 'watch']);