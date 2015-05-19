// Generated on 2014-11-16 using generator-angular 0.10.0
'use strict';
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function(grunt) {

	var appConfig = {
		app: require('./writeon.io/bower.json').appPath || 'app',
        dist: 'dist'
    };
		
    //this is a new html5 rewrite rule so we can use normalized URLs, instead hashmaps (ie - /main instead of /#/main)
    var _sendIndex = function(req, res) {
        var fs = require('fs');
        fs.readFile('writeon.io/app/index.html', function(error, info) {
            res.setHeader('Content-Type', 'text/html');
            res.end(info);
        });
    };
    // set some fallback for rewrite issues
    var _on404 = [];
    _on404.push(['/main', _sendIndex]);
    _on404.push(['/beta', _sendIndex]);
    _on404.push(['/press', _sendIndex]);
    _on404.push(['/features', _sendIndex]);
    _on404.push(['fG7tNpKU', _sendIndex]);
    //_on404.push(['/xyz/', _sendIndex]); // trailing slash will map to an id
    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        yeoman: appConfig,
        bump: {
            options: {
                files: ['writeon.io/package.json', 'writeon.io/bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitfiles: ['writeon.io/package.json', 'writeon.io/bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'github',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false
            }
        },
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['writeon.io/bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['writeon.io/app/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['writeon.io/test/spec/{,*/}*.js'],
                //No Karma until it's needed
                tasks: ['newer:jshint:test', 'karma']
                //tasks: ['newer:jshint:test']
            },
            compass: {
                files: ['writeon.io/app/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: ['writeon.io/app/{,*/}*.html', '.tmp/styles/{,*/}*.css', 'writeon.io/app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}']
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 3000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 4000,
                // Modrewrite rule, connect.static(path) for each path in target's base
                middleware: function(connect, options) {
                    var optBase = (typeof options.base === 'string') ? [options.base] : options.base;
                    return [require('connect-modrewrite')(['!(\\..+)$ / [L]'])].concat(optBase.map(function(path) {
                        return connect.static(path);
                    }));
                }
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [require('connect-modrewrite')(['!(\\..+)$ / [L]']), connect.static('.tmp'), connect().use('/bower_components', connect.static('./writeon.io/bower_components')), connect().use('/fonts', connect.static('./writeon.io/bower_components/bootstrap/dist/fonts')), connect().use('/fonts', connect.static('./writeon.io/bower_components/font-awesome/fonts')), connect.static(appConfig.app)];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [connect.static('.tmp'), connect.static('test'), connect().use('/bower_components', connect.static('./writeon.io/bower_components')), connect.static(appConfig.app)];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: 'writeon.io/dist'
                }
            }
        },
        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: ['Gruntfile.js', 'writeon.io/app/scripts/{,*/}*.js']
            },
            test: {
                options: {
                    jshintrc: 'writeon.io/test/.jshintrc'
                },
                src: ['writeon.io/test/spec/{,*/}*.js']
            }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['.tmp', 'writeon.io/dist/{,*/}*', '!./writeon.io/dist/.git{,*/}*']

                }]
            },
            public: {
                files: [{
                    dot: true,
					cwd: './public/web',
					src: ['*.{ico,png,txt}', 'index.html', 'sitemap.xml', 'views/{,*/}*.html', 'variants/{,*/}*.css', 'variants/{,*/}*.{png,jpg,jpeg,gif,webp,svg}','variants/{,*/}*.html', 'images/{,*/}*.{webp}', 'styles/fonts/{,*/}*.*']

                }]
            },
            server: '.tmp'
        },
        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version'],
                map: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['writeon.io/app/index.html'],
                ignorePath: /\.\.\//
            },
            sass: {
                src: ['writeon.io/app/styles/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: 'writeon.io/app/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: 'writeon.io/app/images',
                javascriptsDir: 'writeon.io/app/scripts',
                fontsDir: 'writeon.io/app/styles/fonts',
                importPath: 'writeon.io/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n',
                sourcemap: true
            },
            dist: {
                options: {
                    generatedImagesDir: 'writeon.io/dist/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: ['writeon.io/dist/scripts/{,*/}*.js', 'writeon.io/dist/{,*/}*.js', 'writeon.io/dist/styles/{,*/}*.css', 'writeon.io/dist/images/**/*.{png,jpg,jpeg,gif,webp,svg}', 'writeon.io/dist/styles/fonts/*']
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: 'writeon.io/app/index.html',
            options: {
                dest: 'writeon.io/dist',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['writeon.io/dist/**/*.html', 'writeon.io/dist/views/{,*/}*.html', 'writeon.io/dist/variants/{,*/}*.html'],
            css: ['writeon.io/dist/styles/**/*.css'],
            options: {
                assetsDirs: ['writeon.io/dist', 'writeon.io/dist/images/']
            }
        },
        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       'writeon.io/dist/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       'writeon.io/dist/scripts/scripts.js': [
        //         'writeon.io/dist/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'writeon.io/app/images',
                    src: '**/*.{png,jpg,jpeg,gif}',
                    dest: 'writeon.io/dist/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'writeon.io/app/images',
                    src: '**/*.svg',
                    dest: 'writeon.io/dist/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'writeon.io/dist',
                    src: ['*.html', 'views/**/*.html'],
                    dest: 'writeon.io/dist'
                }]
            }
        },
        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: ['*.js', '!oldieshim.js'],
                    dest: '.tmp/concat/scripts'
                }]
            }
        },
        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['writeon.io/dist/*.html']
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'writeon.io/app',
                    dest: 'writeon.io/dist',
                    src: ['*.{ico,png,txt}', '.htaccess', '*.html', 'sitemap.xml', 'views/{,*/}*.html', 'variants/{,*/}*.css', 'variants/{,*/}*.{png,jpg,jpeg,gif,webp,svg}','variants/{,*/}*.html', 'images/{,*/}*.{webp}', 'styles/fonts/{,*/}*.*']
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: 'writeon.io/dist/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: '.',
                    src: 'writeon.io/bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                    dest: 'writeon.io/dist'
                }]
            },
            deploy: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'writeon.io/dist',
                    dest: './public/web',
                    src: ['*.{ico,png,txt}', '.htaccess', '*.html', 'sitemap.xml', 'views/{,*/}*.html', 'variants/{,*/}*.css', 'variants/{,*/}*.{png,jpg,jpeg,gif,webp,svg}','variants/{,*/}*.html', 'images/{,*/}*.{webp}', 'styles/fonts/{,*/}*.*']
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: './public/web/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: '.',
                    src: 'writeon.io/bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                    dest: './public/web'
                }]
            },
            styles: {
                expand: true,
                cwd: 'writeon.io/app/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: ['compass:server'],
            test: ['compass'],
            dist: ['compass:dist', 'imagemin', 'svgmin']
        },
        //Comment out Karma until it's actually in use.
        // Test settings
        karma: {
            unit: {
                configFile: 'writeon.io/test/karma.conf.js',
                singleRun: true
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-bump');

	grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
        if(target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run(['clean:server', 'wiredep', 'concurrent:server', 'autoprefixer', 'connect:livereload', 'watch']);
    });
    grunt.registerTask('test', ['clean:server', 'concurrent:test', 'autoprefixer', 'connect:test', 'karma']);
    grunt.registerTask('build', ['clean:dist', 'wiredep', 'useminPrepare', 'concurrent:dist', 'autoprefixer', 'ngAnnotate', 'copy:dist', 'cdnify', 'filerev', 'usemin', 'htmlmin']);
    grunt.registerTask('default', ['newer:jshint', 'test', 'build']);
	grunt.registerTask('copydist', ['copy:dist']);
	grunt.registerTask('deploy', ['copy:deploy']);
    grunt.registerTask('heroku', function(target) {
        // use the target to do whatever, for example:
        grunt.task.run('build:' + target);
    });
};