var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify-css'),
	argv = require('yargs'),
	uglify = require('gulp-uglify');
	
gulp.task('default', ['build']);

gulp.task('build', ['compile-sass', 'compile-modernizr', 'compile-js']);

gulp.task('compile-modernizr', function () {
	return gulp
		.src('bower_components/modernizr/modernizr.js')
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('modernizr.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/dist/'));
});

gulp.task('compile-sass', function () {
	return gulp
		.src([
			'bower_components/foundation/scss/normalize.scss',
			'bower_components/foundation/scss/foundation.scss',
			'source/scss/**/*.scss'
		])
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(argv.production ? minify() : gutil.noop())
		.pipe(concat('hansen.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/dist'));
});

gulp.task('compile-js', function () {
	var order = [
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
	];
	
	if (argv.production) {
		order.push('bower_components/jquery-mockjax/src/jquery.mockjax.js');
	}
	
	return gulp
		.src(order)
		.pipe(sourcemaps.init())
		.pipe(argv.production ? uglify() : gutil.noop())
		.pipe(argv.production ? concat('hansen.min.js') : concat('hansen.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/dist'));
});

gulp.task('jshint', function () {
	return gulp.src('source/scripts/**/*.js', ['jshint'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});