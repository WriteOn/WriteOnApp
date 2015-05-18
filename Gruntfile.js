// Generated on 2014-11-16 using generator-angular 0.10.0
'use strict';
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function(grunt) {

	var appConfig = {
        app: require('./writeon.io/bower.json').appPath || 'writeon.io/app',
        dist: 'writeon.io/dist',
		public: 'public',
		test: 'writeon.io/test',
		bower: 'writeon.io/bower_components',
		base: 'writeon.io'
    };
	
    //this is a new html5 rewrite rule so we can use normalized URLs, instead hashmaps (ie - /main instead of /#/main)
    var _sendIndex = function(req, res) {
        var fs = require('fs');
        fs.readFile('<%= yeoman.app %>/index.html', function(error, info) {
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
        bump: {
            options: {
                files: ['<%= yeoman.base %>/package.json', '<%= yeoman.base %>/bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['<%= yeoman.base %>/package.json', '<%= yeoman.base %>/bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'github',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false
            }
        },
        // Project settings
        yeoman: appConfig,
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['<%= yeoman.base %>/bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['<%= yeoman.test %>/spec/{,*/}*.js'],
                //No Karma until it's needed
                tasks: ['newer:jshint:test', 'karma']
                //tasks: ['newer:jshint:test']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: ['<%= yeoman.app %>/{,*/}*.html', '.tmp/styles/{,*/}*.css', '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}']
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
                        return [require('connect-modrewrite')(['!(\\..+)$ / [L]']), connect.static('.tmp'), connect().use('/bower_components', connect.static('<%= yeoman.bower %>')), connect().use('/fonts', connect.static('<%= yeoman.bower %>/bootstrap/dist/fonts')), connect().use('/fonts', connect.static('<%= yeoman.bower %>/font-awesome/fonts')), connect.static(appConfig.app)];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [connect.static('.tmp'), connect.static('test'), connect().use('/bower_components', connect.static('<%= yeoman.bower %>')), connect.static(appConfig.app)];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
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
                src: ['Gruntfile.js', '<%= yeoman.app %>/scripts/{,*/}*.js']
            },
            test: {
                options: {
                    jshintrc: '<%= yeoman.test %>/.jshintrc'
                },
                src: ['<%= yeoman.test %>/spec/{,*/}*.js']
            }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['.tmp', '<%= yeoman.dist %>/{,*/}*', '!<%= yeoman.dist %>/.git{,*/}*']

                }]
            },
            public: {
                files: [{
                    dot: true,
					cwd: '<%= yeoman.public %>',
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
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: /\.\.\//
            },
            sass: {
                src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.bower %>',
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
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
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
                src: ['<%= yeoman.dist %>/scripts/{,*/}*.js', '<%= yeoman.dist %>/{,*/}*.js', '<%= yeoman.dist %>/styles/{,*/}*.css', '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}', '<%= yeoman.dist %>/styles/fonts/*']
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
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
            html: ['<%= yeoman.dist %>/**/*.html', '<%= yeoman.dist %>/views/{,*/}*.html', '<%= yeoman.dist %>/variants/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/**/*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images/']
            }
        },
        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
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
                    cwd: '<%= yeoman.app %>/images',
                    src: '**/*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '**/*.svg',
                    dest: '<%= yeoman.dist %>/images'
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
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/**/*.html'],
                    dest: '<%= yeoman.dist %>'
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
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: ['*.{ico,png,txt}', '.htaccess', '*.html', 'sitemap.xml', 'views/{,*/}*.html', 'variants/{,*/}*.css', 'variants/{,*/}*.{png,jpg,jpeg,gif,webp,svg}','variants/{,*/}*.html', 'images/{,*/}*.{webp}', 'styles/fonts/{,*/}*.*']
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: '.',
                    src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                    dest: '<%= yeoman.dist %>'
                }]
            },
            deploy: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.dist %>',
                    dest: '<%= yeoman.public %>',
                    src: ['*.{ico,png,txt}', '.htaccess', '*.html', 'sitemap.xml', 'views/{,*/}*.html', 'variants/{,*/}*.css', 'variants/{,*/}*.{png,jpg,jpeg,gif,webp,svg}','variants/{,*/}*.html', 'images/{,*/}*.{webp}', 'styles/fonts/{,*/}*.*']
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.public %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: '.',
                    src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                    dest: '<%= yeoman.public %>'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
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
                configFile: '<%= yeoman.test %>/karma.conf.js',
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
    grunt.registerTask('build', ['wiredep', 'useminPrepare', 'concurrent:dist', 'autoprefixer', 'ngAnnotate', 'copy:dist', 'cdnify', 'filerev', 'usemin', 'htmlmin']);
    grunt.registerTask('default', ['newer:jshint', 'test', 'build']);
	grunt.registerTask('copydist', ['copy:dist']);
	grunt.registerTask('deploy', ['copy:deploy']);
    grunt.registerTask('heroku', function(target) {
        // use the target to do whatever, for example:
        grunt.task.run('build:' + target);
    });
};