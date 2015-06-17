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
var livereload = require('gulp-livereload');

var options = {
  app: 'writeon.app',
  server: 'writeon.server',
  dist: 'public/writeon',
  tmp: '.tmp',
  e2e: 'e2e',
  bower_dist: 'public/bower_components',
  bower: 'bower_components',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components',
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
 *  Copy Require.js LESS.js CSS.js Editor packages
 */

gulp.task('clean-requireless', function() {
	return gulp.src([
		options.bower_dist + '/**/*less.js',
		options.bower_dist + '/**/*lessc.js',
		options.bower_dist + '/**/*normalize.js',
		options.bower_dist + '/**/*css*.js'
	])
		// .pipe(debug())
        .pipe(clean());
});

gulp.task('clean-editors', function() {
	return gulp.src([
		options.bower_dist + '/codemirror/**/*',
		options.bower_dist + '/ace/**/*'
	])
		// .pipe(debug())
        .pipe(clean());
});
gulp.task('copy-requireless', function() {
return gulp.src([
		options.bower + '/require-less/less.js',
		options.bower + '/require-less/lessc.js',
		options.bower + '/require-less/normalize.js'
	])
  .pipe(copy(options.bower_dist + '/require-less/', {prefix: 2}));
});


gulp.task('copy-requirecss', function() {
return gulp.src([
		options.bower + '/require-css/css.min.js',
		options.bower + '/require-css/normalize.js'
	])
  .pipe(copy(options.bower_dist + '/require-css/', {prefix: 2}));
});

gulp.task('copy-codemirror', function() {
return gulp.src([
		options.bower + '/codemirror/lib/**/*',
		options.bower + '/codemirror/mode/**/*.js',
		options.bower + '/codemirror/theme/**/*.css'
	])
  .pipe(copy(options.bower_dist + '/codemirror/', {prefix: 2}));
});

gulp.task('copy-ace', function() {
return gulp.src([
		options.bower + '/ace/lib/ace/**/*'
	])
  .pipe(copy(options.bower_dist + '/ace/', {prefix: 2}));
});
/** __________________________________________
 * RequireJS
 */

gulp.task('clean-requirejs', function() {
	return gulp.src([
		options.dist + '/main.js',
		options.dist + '/pace-theme-writeon.css',
		options.dist + '/pace.min.js',
		options.dist + '/require.js'
	])
		// .pipe(debug())
        .pipe(clean());
});

gulp.task('copy-requirejs', ['clean-requirejs'], function() {
	return gulp.src([
		options.app + '/libs/pace/pace-theme-writeon.css',
		options.bower + '/pace/pace.min.js',
		options.bower + '/requirejs/require.js'
	])
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
        options.bower + '/bootstrap-material-design/fonts/*'
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
				options.bower + '/MathJax/MathJax.js',
				options.bower + '/MathJax/config/Safe.js',
				options.bower + '/MathJax/config/TeX-AMS_HTML.js',
				options.bower + '/MathJax/images/CloseX-31.png',
				options.bower + '/MathJax/images/MenuArrow-15.png',
				options.bower + '/MathJax/jax/output/HTML-CSS/jax.js',
				options.bower + '/MathJax/extensions/**/*.*',
				options.bower + '/MathJax/fonts/HTML-CSS/TeX/woff/**/*.*',
				options.bower + '/MathJax/jax/element/**/*.*',
				options.bower + '/MathJax/jax/output/HTML-CSS/autoload/**/*.*',
				options.bower + '/MathJax/jax/output/HTML-CSS/fonts/TeX/**/*.*',
				options.bower + '/MathJax/jax/output/HTML-CSS/fonts/STIX/**/*.*'
			], {
				read: false,
				cwd: './writeon.app'
			}),
			{
				starttag: '# start_inject_mathjax',
				endtag: '# end_inject_mathjax',
				ignoreExtensions: true,
				transform: function(filepath) {
					if(filepath == options.bower + '/MathJax/MathJax.js') {
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
gulp.task('editors', [
	'clean-editors',
	'copy-codemirror',
	'copy-ace'
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
				exec('git push github master --tags', cb); // fedora - this is NOT ideal, where we hard code the git direction...needs elegance
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
			'build',
			'bump-' + importance,
			'git-tag',
			cb);
	};
}


/*
 * Live Reload
*/
gulp.task('connect', function() {
  connect.server({
    root: 'server.js',
	port: 9601,
    livereload: true
  });
});
 
gulp.task('connect-less', function() {
  gulp.src([options.app + '/styles/*.less', options.app + '/themes/*.less'])
    .pipe(less())
    .pipe(gulp.dest('.tmp/css'))
    .pipe(livereload());
});

gulp.task('html', function () {
  gulp.src(options.server + '/views/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch([options.server + '/views/*.html'], ['html']);
  gulp.watch(options.app + 'styles/*.less', ['less']);
  gulp.watch(options.app + 'themes/*.less', ['less']);
  gulp.watch([options.app + '/**/*.js'], ['js']);
  gulp.watch([options.app + '/**/*.html'], ['html']);
  gulp.watch(['Gulpfile.js'], ['js']);
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
