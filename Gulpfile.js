/* Hold on now, this gets wild in 102ms 
 * 
 * 
 * To debug, uncomment: var debug = require('gulp-debug');
 * For verbose debugging: change to .pipe(debug({verbose: true}))
 * Debug Help: https://github.com/sindresorhus/gulp-debug
 * For Gulp Help: http://gulpjs.com
*/

/* jshint -W015 */
var gulp = require('gulp');
//var debug = require('gulp-debug');
var util = require('gulp-util');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var requirejs = require('gulp-requirejs');
var bowerRequirejs = require('bower-requirejs');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var inject = require('gulp-inject');
var replace = require('gulp-replace');
var bump = require('gulp-bump');
var childProcess = require('child_process');
var runSequence = require('run-sequence');
var fs = require('fs');
var connect = require('gulp-connect');


/** __________________________________________
 * constants.js
 */
function getVersion() {
	var packageJson = JSON.parse(fs.readFileSync(__dirname + '/package.json', {
		encoding: 'utf8'
	}));
	return packageJson.version;
}

gulp.task('constants', function() {
	return gulp.src('./writeon.app/constants.js')
		.pipe(replace(/constants\.VERSION = .*/, 'constants.VERSION = "' + getVersion() + '";'))
        //.pipe(debug())
		.pipe(gulp.dest('./writeon.app/'));
});

/** __________________________________________
 * JSHint
 */

gulp.task('jshint', function() {
	return gulp.src([
		'./*.js',
		'./writeon.server/**/*.js',
		'./writeon.app/classes/**/*.js',
		'./writeon.app/extensions/**/*.js',
		'./writeon.app/helpers/**/*.js',
		'./writeon.app/providers/**/*.js',
		'./writeon.app/*.js'
	])
		// .pipe(debug())
        .pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

/** __________________________________________
 * RequireJS
 */

gulp.task('clean-requirejs', function() {
	return gulp.src([
		'./public/writeon/main.js',
		'./public/writeon/require.js'
	])
		// .pipe(debug())
        .pipe(clean());
});

gulp.task('copy-requirejs', ['clean-requirejs'], function() {
	return gulp.src('./writeon.app/bower-libs/requirejs/require.js')
		// .pipe(debug())
        .pipe(gulp.dest('./public/writeon/'));
});

gulp.task('requirejs', [
	'copy-requirejs',
	'constants'
], function() {
	return requirejs({
		baseUrl: 'public/res',
		name: 'main',
		out: 'main.js',
		mainConfigFile: 'writeon.app/main.js',
		optimize: 'uglify2',
		inlineText: true,
		paths: {
			mathjax: 'empty:'
		},
		excludeShallow: [
			'css/css-builder',
			'less/lessc-server',
			'less/lessc'
		]
	})
		.pipe(uglify({
			output: {
				beautify: true,
				indent_level: 1,
				ascii_only: true
			}
		}))
		// .pipe(debug())
        .pipe(gulp.dest('./public/writeon/'));
});

gulp.task('bower-requirejs', function(cb) {
	bowerRequirejs({
		config: './writeon.app/main.js'
	}, function() {
		cb();
	});
});

/** __________________________________________
 * Less
 */

gulp.task('clean-less', function() {
	return gulp.src('./public/writeon/themes')
		// .pipe(debug())
        .pipe(clean());
});

gulp.task('less', ['clean-less'], function() {
	return gulp.src([
		'./writeon.app/styles/base.less',
		'./writeon.app/themes/*.less'
	])
		.pipe(less({
			compress: true
		}))
		// .pipe(debug())
        .pipe(gulp.dest('./public/writeon/themes/'));
});

/** __________________________________________
 * Fonts
 */

gulp.task('clean-font', function() {
	return gulp.src('./public/writeon/font')
		// .pipe(debug())
        .pipe(clean());
});

gulp.task('copy-font', ['clean-font'], function() {
	return gulp.src([
        './writeon.app/font/*', 
        './writeon.app/bower-libs/bootstrap-material-design/fonts/*'
    ])
		// .pipe(debug())
        .pipe(gulp.dest('./public/writeon/font/'));
});

/** __________________________________________
 * Images
 */

gulp.task('clean-img', function() {
	return gulp.src('./public/writeon/img')
		// .pipe(debug())
        .pipe(clean());
});

gulp.task('copy-img', ['clean-img'], function() {
	return gulp.src('./writeon.app/img/*')
		// .pipe(debug())
        .pipe(gulp.dest('./public/writeon/img/'));
});

/** __________________________________________
 * cache.manifest
 */

gulp.task('cache-manifest-mathjax', function() {
	return gulp.src('./public/cache.manifest')
		.pipe(replace(/(#Date ).*/, '$1' + Date()))
		.pipe(replace(/(#Version ).*/, '$1' + getVersion()))
		.pipe(inject(gulp.src([
				'./writeon/**/*.*'
			], {
				read: false,
				cwd: './public'
			}),
			{
				starttag: '# start_inject_resources',
				endtag: '# end_inject_resources',
				ignoreExtensions: true,
				transform: function(filepath) {
					return filepath.substring(1);
				}
			}))
		.pipe(inject(gulp.src([
				'./res/bower-libs/MathJax/MathJax.js',
				'./res/bower-libs/MathJax/config/Safe.js',
				'./res/bower-libs/MathJax/config/TeX-AMS_HTML.js',
				'./res/bower-libs/MathJax/images/CloseX-31.png',
				'./res/bower-libs/MathJax/images/MenuArrow-15.png',
				'./res/bower-libs/MathJax/jax/output/HTML-CSS/jax.js',
				'./res/bower-libs/MathJax/extensions/**/*.*',
				'./res/bower-libs/MathJax/fonts/HTML-CSS/TeX/woff/**/*.*',
				'./res/bower-libs/MathJax/jax/element/**/*.*',
				'./res/bower-libs/MathJax/jax/output/HTML-CSS/autoload/**/*.*',
				'./res/bower-libs/MathJax/jax/output/HTML-CSS/fonts/TeX/**/*.*',
				'./res/bower-libs/MathJax/jax/output/HTML-CSS/fonts/STIX/**/*.*'
			], {
				read: false,
				cwd: './public'
			}),
			{
				starttag: '# start_inject_mathjax',
				endtag: '# end_inject_mathjax',
				ignoreExtensions: true,
				transform: function(filepath) {
					if(filepath == '/res/bower-libs/MathJax/MathJax.js') {
						filepath += '?config=TeX-AMS_HTML';
					}
					else {
						filepath += '?rev=2.4-beta-2';
					}
					return filepath.substring(1);
				}
			}))
		// .pipe(debug())
        .pipe(gulp.dest('./public/'));
});

gulp.task('cache', function() {
	return gulp.src('./public/cache.manifest')
		.pipe(replace(/(#Date ).*/, '$1' + Date()))
		.pipe(replace(/(#Version ).*/, '$1' + getVersion()))
		.pipe(inject(gulp.src([
				'./writeon/**/*.*'
			], {
				read: false,
				cwd: './public'
			}),
			{
				starttag: '# start_inject_resources',
				endtag: '# end_inject_resources',
				ignoreExtensions: true,
				transform: function(filepath) {
					return filepath.substring(1);
				}
			}))
		// .pipe(debug())
        .pipe(gulp.dest('./public/'));
});
gulp.task('cache-manifest', function() {
	return gulp.src('./public/cache.manifest')
		.pipe(replace(/(#Date ).*/, '$1' + Date()))
		.pipe(replace(/(#Version ).*/, '$1' + getVersion()))
		.pipe(inject(gulp.src([
				'./writeon/**/*.*'
			], {
				read: false,
				cwd: './public'
			}),
			{
				starttag: '# start_inject_resources',
				endtag: '# end_inject_resources',
				ignoreExtensions: true,
				transform: function(filepath) {
					return filepath.substring(1);
				}
			}))
		// .pipe(debug())
        .pipe(gulp.dest('./public/'));
});

gulp.task('clean', [
	'clean-requirejs',
	'clean-less',
	'clean-font',
	'clean-img'
]);
gulp.task('default', function(cb) {
	runSequence([
			'jshint',
			'requirejs',
			'less',
			'copy-font',
			'copy-img'
		],
		'cache-manifest',
		cb);
});

function bumpTask(importance) {
	return function() {
		return gulp.src([
			'./package.json',
			'./bower.json'
		])
			.pipe(bump({type: importance}))
            // .pipe(debug())
			.pipe(gulp.dest('./'));
	};
}

gulp.task('bump-patch', bumpTask('patch'));
gulp.task('bump-minor', bumpTask('minor'));
gulp.task('bump-major', bumpTask('major'));

function exec(cmd, cb) {
	childProcess.exec(cmd, {cwd: process.cwd()}, function(err, stdout, stderr) {
		if(!err) {
			util.log(stdout, stderr);
		}
		cb(err);
	});
}

gulp.task('git-tag', function(cb) {
	var tag = 'v' + getVersion();
	util.log('Tagging as: ' + util.colors.cyan(tag));
	exec('git add ./public/writeon', function(err) {
		if(err) {
			return cb(err);
		}
        exec('git commit -a -m "Prepared & released: "' + tag + '.', function(err) {
			if(err) {
				return cb(err);
			}
			exec('git tag -a ' + tag + ' -m "Version ' + getVersion() + '"', function(err) {
				if(err) {
					return cb(err);
				}
				//exec('git push heroku-beta master --tags', cb); // fedora - this is NOT ideal, where we hard code the git direction...needs elegance
				exec('git push github master --tags', cb); // fedora - this is NOT ideal, where we hard code the git direction...needs elegance
			});
		});
	});
});

function releaseTask(importance) {
	return function(cb) {
		runSequence(
			'bump-' + importance,
			'default',
			'git-tag',
			cb);
	};
}


/* 
 * Beep, Boop, or Bop New WriteOn Releases using gulp-bump
 * 
*/

gulp.task('beep', releaseTask('patch'));     // beep
gulp.task('boop', releaseTask('minor'));     // boop
gulp.task('bop', releaseTask('major'));     // bop




/*
 * Live Reload
*/

gulp.task('connect', function() {
  connect.server({
    root: 'app',
	port: 3001,
    livereload: true
  });
});
 
gulp.task('html', function () {
  gulp.src('./views/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./views/*.html'], ['html']);
});