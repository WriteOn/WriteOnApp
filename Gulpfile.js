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
var copy = require('gulp-copy');


var options = {
  app: 'writeon.app',
  server: 'writeon.server',
  dist: 'public/writeon',
  tmp: '.tmp',
  e2e: 'e2e',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: './writeon.app/bower-libs',
    exclude: [/bootstrap-sass-official\/.*\.js/, /bootstrap\.css/]
  }
};

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
	return gulp.src(options.app + '/constants.js')
		.pipe(replace(/constants\.VERSION = .*/, 'constants.VERSION = "' + getVersion() + '";'))
        //.pipe(debug())
		.pipe(gulp.dest(options.app));
});

/** __________________________________________
 * JSHint
 */

gulp.task('jshint', function() {
	return gulp.src([
		options.server + '/**/*.js',
		options.app + '/classes/**/*.js',
		options.app + '/extensions/**/*.js',
		options.app + '/helpers/**/*.js',
		options.app + '/providers/**/*.js',
		options.app + '/*.js'
	])
		// .pipe(debug())
        .pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

/** __________________________________________
 *  Require.js LESS.js and CSS.js
 */

gulp.task('clean-requireless', function() {
	return gulp.src([
		options.dist + '/bower-libs/**/*less.js',
		options.dist + '/bower-libs/**/*lessc.js',
		options.dist + '/bower-libs/**/*normalize.js',
		options.dist + '/bower-libs/**/*css*.js'
	])
		// .pipe(debug())
        .pipe(clean());
});

gulp.task('copy-requireless', function() {
return gulp.src([
		options.app + '/bower-libs/require-less/less.js',
		options.app + '/bower-libs/require-less/lessc.js',
		options.app + '/bower-libs/require-less/normalize.js'
	])
  .pipe(copy(options.dist + '/bower-libs', {prefix: 2}));
});


gulp.task('copy-requirecss', function() {
return gulp.src([
		options.app + '/bower-libs/require-css/css.min.js',
		options.app + '/bower-libs/require-css/normalize.js'
	])
  .pipe(copy(options.dist + '/bower-libs', {prefix: 2}));
});


/** __________________________________________
 * RequireJS
 */

gulp.task('clean-requirejs', function() {
	return gulp.src([
		options.dist + '/main.js',
		options.dist + '/require.js'
	])
		// .pipe(debug())
        .pipe(clean());
});

gulp.task('copy-requirejs', ['clean-requirejs'], function() {
	return gulp.src(options.app + '/bower-libs/requirejs/require.js')
		// .pipe(debug())
        .pipe(gulp.dest(options.dist + '/'));
});

gulp.task('requirejs', [
	'copy-requirejs',
	'constants'
], function() {
	return requirejs({
		baseUrl: options.app,
		name: 'main',
		out: 'main.js',
		mainConfigFile: options.app + '/main.js',
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
        .pipe(gulp.dest('./public/writeon'));
});

gulp.task('bower-requirejs', function(cb) {
	bowerRequirejs({
		config: options.app + '/main.js'
	}, function() {
		cb();
	});
});

/** __________________________________________
 * Less
 */

gulp.task('clean-less', function() {
	return gulp.src(options.dist + '/themes')
		// .pipe(debug())
        .pipe(clean());
});

gulp.task('less', ['clean-less'], function() {
	return gulp.src([
		options.app + '/styles/base.less',
		options.app + '/themes/*.less'
	])
		.pipe(less({
			compress: true
		}))
		// .pipe(debug())
        .pipe(gulp.dest(options.dist + '/themes/'));
});

/** __________________________________________
 * Fonts
 */

gulp.task('clean-font', function() {
	return gulp.src(options.dist + '/font')
		// .pipe(debug())
        .pipe(clean());
});

gulp.task('copy-font', ['clean-font'], function() {
	return gulp.src([
        options.app + '/font/*', 
        options.app + '/bower-libs/bootstrap-material-design/fonts/*'
    ])
		// .pipe(debug())
        .pipe(gulp.dest(options.dist + '/font/'));
});

/** __________________________________________
 * Images
 */

gulp.task('clean-img', function() {
	return gulp.src(options.dist + '/img')
		// .pipe(debug())
        .pipe(clean());
});

gulp.task('copy-img', ['clean-img'], function() {
	return gulp.src(options.app + '/img/*')
		// .pipe(debug())
        .pipe(gulp.dest(options.dist + '/img/'));
});

/** __________________________________________
 * HTML Parts
 */

gulp.task('clean-html', function() {
	return gulp.src(options.dist + '/html')
		// .pipe(debug())
        .pipe(clean());
});

gulp.task('copy-html', ['clean-html'], function() {
	return gulp.src([
        options.app + '/html/*'
    ])
		// .pipe(debug())
        .pipe(gulp.dest(options.dist + '/html/'));
});

/** __________________________________________
 * CACHE.
 * cache.manifest files for offline app parts
 */

gulp.task('cache', function() {
	return gulp.src('./public/offline/writeon.app.manifest')
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
					return filepath.substring('/' + 1);
				}
			}))
		// .pipe(debug())
        .pipe(gulp.dest('./public/offline/'));
});

gulp.task('cache-mathjax', function() {
	return gulp.src('./public/writeon.mathjax.manifest')
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
				cwd: './writeon.app'
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
		.pipe(debug())
        .pipe(gulp.dest('./public/'));
});

gulp.task('clean', [
	'clean-requirejs',
	'clean-requireless',
	'clean-less',
	'clean-font',
	'clean-img',
	'clean-html'
]);
gulp.task('requireless', [
	'clean-requireless',
	'copy-requireless',
	'copy-requirecss'
]);

gulp.task('build', function(cb) {
	runSequence([
			'jshint',
			'requireless',
			'requirejs',
			'less',
			'copy-font',
			'copy-img',
			'copy-html'
		],
		'cache',
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
	exec('git add --all', function(err) {
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
				//exec('git push heroku-next master --tags', cb); // fedora - this is NOT ideal, where we hard code the git direction...needs elegance
				exec('git push github 2.0 --tags', cb); // fedora - this is NOT ideal, where we hard code the git direction...needs elegance
			});
		});
	});
});


/* 
 * Beep, Boop, or Bop New WriteOn Releases using gulp-bump
 * 
*/

gulp.task('beep', releaseTask('patch'));     // beep
gulp.task('boop', releaseTask('minor'));     // boop
gulp.task('bop', releaseTask('major'));     // bop

function releaseTask(importance) {
	return function(cb) {
		runSequence(
			'bump-' + importance,
			'build',
			'git-tag',
			cb);
	};
}


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
  gulp.src(options.server + '/views/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch([options.server + '/views/*.html'], ['html']);
});


/* 
 * TASK LIST - For reference only.
 * From the writeon.docs/developer-guide.md#Independent Build/Minify Steps
 * 

gulp constants 			# builds constants
gulp jshint 			# builds javascript sources
gulp clean-requirejs 	# removes requireJS modules (./public/writeon/main.js, ./public/writeon/require.js)
gulp copy-requirejs 	# builds requireJS modules
gulp requirejs 			# performs clean-requirejs + copy-requirejs and builds LESS, MathJax, etc.
gulp bower-requirejs 	# SEE note above, requires adding module to bower using --save
gulp clean-less 		# removes ./public/writeon/themes/*.css files
gulp less 				# builds & compresses all LESS ./public/res/styles/base.less + ./public/res/themes/*
gulp clean-font 		# removes all fonts from ./public/writeon/font
gulp copy-font 			# removes and builds fonts    
gulp clean-img 			# removes all images from ./public/writeon/img
gulp copy-img 			# removes and builds images
gulp cache 				# cleans and builds the cache manifest
gulp clean 				# cleans out all of the above clean tasks
gulp build 				# basic build of the project
gulp beep 				# apply a patch (see https://github.com/webjay/node-bump)
gulp boop 				# apply a minor version
gulp boop 				# apply a major version 
gulp bump-patch 		# apply a patch (see https://github.com/webjay/node-bump)
gulp bump-minor 		# apply a minor version
gulp bump-major 		# apply a major version 
gulp git-tag 			# creates a tagged commit & pushes...

# Performs git add ./public/writeon, git commit -a -m "Prepare release", git tag -a '_tag_', git push __endpoint__ master --tags
gulp patch # runs releaseTask('patch')
gulp minor # runs releaseTask('minor')
gulp major # runs releaseTask('major')

*/ 
