var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	minifyHtml = require('gulp-htmlmin'),
	watch = require('gulp-watch');


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './'
		}
	});
});

gulp.task('scripts_original', function() {
	return gulp.src(['app/js/*.js', 'app/js/*/*.js'])
		.pipe(concat('common.min.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('min'));
});

gulp.task('js-watch', ['scripts_original'], function (done) {
    browserSync.reload();
    done();
});


// use default task to launch Browsersync and watch JS files
gulp.task('watch', ['scripts_original'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("app/js/*.js", ['js-watch']);
    gulp.watch("app/js/*/*.js", ['js-watch']);
});

gulp.task('build', [ 'css-original', 'scripts', 'scripts_original'], function() {
	console.log("======== 100% ========");
});

gulp.task('default', ['watch']);
