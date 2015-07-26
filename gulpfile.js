var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	order = require('gulp-order'),
	minify = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	print = require('gulp-print'),
	addsrc = require('gulp-add-src'),
	jsBuild = require('./source/scripts/build.js');
	
gulp.task('default', ['watch']);

gulp.task('compile-sass', function () {
	return gulp.src(['bower_components/foundation/scss/*.scss' ,'source/scss/**/*.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(order([
			'bower_components/foundation/scss/normalize.scss',
			'bower_components/foundation/scss/foundation.scss',
			'source/scss/**/*.scss'
		]))
		.pipe(gutil.env.type === 'production' ? minify() : gutil.noop())
		.pipe(concat('styles.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/dist'));
});

gulp.task('compile-js', function () {
	var jsLibs = [
		'bower_components/jquery/dist/jquery.js',
		'bower_components/pubsub-js/src/pubsub.js',
		'bower_components/foundation/js/foundation/foundation.js',
		'bower_components/foundation/js/foundation/foundation.magellan.js',
		'bower_components/foundation/js/foundation/foundation.clearing.js',		
	];
	
	if (gutil.env.type !== 'production') {
		jsLibs.push('bower_components/jquery-mockjax/src/jquery.mockjax.js');
	}
	
	return gulp.src(jsLibs)
		.pipe(sourcemaps.init())
		.pipe(addsrc.append('source/scripts/**/*.js'))
		.pipe(order([
			'bower_components/jquery/dist/jquery.js',
			'bower_components/pubsub-js/src/pubsub.js',
			'bower_components/foundation/js/foundation/foundation.js',
			'bower_components/foundation/js/foundation/foundation.magellan.js',
			'bower_components/foundation/js/foundation/foundation.clearing.js',
			'source/scripts/equalizer.js',
			'source/scripts/scroll-fader.js',
			'source/scripts/geocoder.js',
			'source/scripts/map.js',
			'source/scripts/regex.js',
			'source/scripts/validator.js',
			'source/scripts/inquiry.js',
			'source/scripts/inquiry-validator.js',
			'source/scripts/inquiry-map.js',
			'source/scripts/alert.js',
			'source/scripts/cover.js',
			'source/scripts/error-list.js',
			'source/scripts/form.js'			
		]))
		.pipe(print())
		.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
		.pipe(gutil.env.type === 'production' ? concat('hansen.min.js') : concat('hansen.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/dist'));
});

gulp.task('jshint', function () {
	return gulp.src('source/scripts/**/*.js', ['jshint'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function () {
	gulp.watch('source/scripts/**/*.js', ['jshint']);
	gulp.watch('source/scss/**/*/scss', ['compile-sass']);
});