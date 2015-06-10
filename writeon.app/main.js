// load the loader (overlay) before we load the loader (AMD)
//var bodyLoadingHTML = '<div class="overlay_loader_wrapper"><div class="overlay_loader"><span id="overlay_loader_1"></span><span id="overlay_loader_2"></span><span id="overlay_loader_3"></span></div></div>';
//document.body.innerHTML = bodyLoadingHTML;

// RequireJS configuration
/*global requirejs */
requirejs.config({
	waitSeconds: 0,
    nodeRequire: require,
	packages: [
		{
			name: 'css',
			location: '../bower_components/require-css',
			main: 'css'
		},
		{
			name: 'less',
			location: '../bower_components/require-less',
			main: 'less'
		}
	],
	
	paths: {
		jquery: '../bower_components/jquery/dist/jquery.min',
		underscore: '../bower_components/underscore/underscore',
		crel: '../bower_components/crel/crel',
		jgrowl: '../bower_components/jgrowl/jquery.jgrowl',
		mousetrap: '../bower_components/mousetrap/mousetrap',
		'mousetrap-record': '../bower_components/mousetrap/plugins/record/mousetrap-record',
		toMarkdown: '../bower_components/to-markdown/src/to-markdown',
		text: '../bower_components/requirejs-text/text',
		bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
		material_ripples: '../bower_components/bootstrap-material-design/dist/js/ripples.min',
		bootstrap_material: '../bower_components/bootstrap-material-design/dist/js/bootstrap.material.min',
		requirejs: '../bower_components/requirejs/require',
		domReady: '../bower_components/requirejs-domready/domReady',
		'google-code-prettify': '../bower_components/google-code-prettify/src/prettify',
		highlightjs: 'libs/highlight/highlight.pack',
		'jquery-waitforimages': '../bower_components/waitForImages/src/jquery.waitforimages',
		'jquery-ui': '../bower_components/jquery-ui/ui/jquery-ui',
		'jquery-ui-core': '../bower_components/jquery-ui/ui/jquery.ui.core',
		'jquery-ui-widget': '../bower_components/jquery-ui/ui/jquery.ui.widget',
		'jquery-ui-mouse': '../bower_components/jquery-ui/ui/jquery.ui.mouse',
		'jquery-ui-draggable': '../bower_components/jquery-ui/ui/jquery.ui.draggable',
		'jquery-ui-effect': '../bower_components/jquery-ui/ui/jquery.ui.effect',
		'jquery-ui-effect-slide': '../bower_components/jquery-ui/ui/jquery.ui.effect-slide',
		FileSaver: '../bower_components/FileSaver/FileSaver',
		stacktrace: '../bower_components/stacktrace/stacktrace',
		'requirejs-text': '../bower_components/requirejs-text/text',
		'bootstrap-tour': '../bower_components/bootstrap-tour/build/js/bootstrap-tour',
		'Slider': '../bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min',
		css_browser_selector: '../bower_components/css_browser_selector/css_browser_selector',
		'pagedown-extra': '../bower_components/pagedown-extra/node-pagedown-extra',
		pagedownExtra: '../bower_components/pagedown-extra/Markdown.Extra',
		pagedown: 'libs/Markdown.Editor',
		'require-css': '../bower_components/require-css/css',
		xregexp: '../bower_components/xregexp/xregexp-all',
		yaml: '../bower_components/yaml.js/bin/yaml',
		'yaml.js': '../bower_components/yaml.js',
		'yaml-js': '../bower_components/yaml.js/bin/yaml',
		css: '../bower_components/require-css/css',
		'css-builder': '../bower_components/require-css/css-builder',
		normalize: '../bower_components/require-css/normalize',
		prism: '../bower_components/prism/prism',
		'prism-core': '../bower_components/prism/components/prism-core',
		MutationObservers: '../bower_components/MutationObservers/MutationObserver',
		WeakMap: '../bower_components/WeakMap/weakmap',
		rangy: '../bower_components/rangy/rangy-core',
		'rangy-cssclassapplier': '../bower_components/rangy/rangy-cssclassapplier',
		diff_match_patch: '../bower_components/google-diff-match-patch-js/diff_match_patch',
		diff_match_patch_uncompressed: '../bower_components/google-diff-match-patch-js/diff_match_patch_uncompressed',
		jsondiffpatch: '../bower_components/jsondiffpatch/build/bundle',
		hammerjs: '../bower_components/hammerjs/hammer',
		Diagram: '../bower_components/js-sequence-diagrams/src/sequence-diagram',
		'diagram-grammar': '../bower_components/js-sequence-diagrams/build/diagram-grammar',
		raphael: '../bower_components/raphael/raphael',
		'flow-chart': '../bower_components/flowchart/release/flowchart.amd-1.2.10.min',
		flowchart: '../bower_components/flowchart/release/flowchart-1.2.10.min',
		monetizejs: '../bower_components/monetizejs/src/monetize',
		'to-markdown': '../bower_components/to-markdown/src/to-markdown',
		waitForImages: '../bower_components/waitForImages/dist/jquery.waitforimages',
		alertify: '../bower_components/alertify.js/lib/alertify',
        oauth: '../bower_components/oauth-js/dist/oauth',
        couchdb: 'libs/jquery.couch',
        contextjs: '../bower_components/Context.js/context',
        pace: '../bower_components/pace/pace.min',
        'dropdown-hover': '../bower_components/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		jgrowl: {
			deps: [
				'jquery'
			],
			exports: 'jQuery.jGrowl'
		},
		diff_match_patch_uncompressed: {
			exports: 'diff_match_patch'
		},
		jsondiffpatch: [
			'diff_match_patch_uncompressed'
		],
		rangy: {
			exports: 'rangy'
		},
		'rangy-cssclassapplier': [
			'rangy'
		],
		mousetrap: {
			exports: 'Mousetrap'
		},
		'yaml-js': {
			exports: 'YAML'
		},
		'prism-core': {
			exports: 'Prism'
		},
		'../../bower_components/prism/components/prism-markup': [
			'prism-core'
		],
		'libs/prism-latex': [
			'prism-core'
		],
		'libs/prism-markdown': [
			'../../bower_components/prism/components/prism-markup',
			'libs/prism-latex'
		],
		'bootstrap-record': [
			'mousetrap'
		],
		toMarkdown: {
			deps: [
				'jquery'
			],
			exports: 'toMarkdown'
		},
		stacktrace: {
			exports: 'printStackTrace'
		},
		FileSaver: {
			exports: 'saveAs'
		},
		MutationObservers: [
			'WeakMap'
		],
		highlightjs: {
			exports: 'hljs'
		},
		'bootstrap-tour': {
			deps: [
				'bootstrap'
			],
			exports: 'Tour'
		},
		bootstrap: [
			'jquery'
		],
		bootstrap_material: {
			deps: [
				'bootstrap'
			],
			exports: 'material'
        },
		ripples: {
			deps: [
				'bootstrap_material'
			],
			exports: 'ripples'
        },
		'jquery-waitforimages': [
			'jquery'
		],
		pagedown: [
			'libs/Markdown.Converter'
		],
		pagedownExtra: [
			'libs/Markdown.Converter'
		],
		'flow-chart': [
			'raphael'
		],
		'diagram-grammar': [
			'underscore'
		],
		Diagram: [
			'raphael',
			'diagram-grammar'
		]
	}
});

// Check browser compatibility
try {
	var test = 'seLocalStorageCheck';
	localStorage.setItem(test, test);
	localStorage.removeItem(test);
	var obj = {};
	Object.defineProperty(obj, 'prop', {
		get: function() {
		},
		set: function() {
		}
	});
}
catch(e) {
	alert('Your browser is not supported, please upgrade to a more safe & reliable browser.');
	throw e;
}

// Paper mode is deduced from the body class
window.viewerMode = /(^| )paper($| )/.test(document.body.className);

// Keep the theme in a global variable
window.theme = localStorage.themeV4 || 'gray';
var themeModule = "less!themes/" + window.theme;
if(window.baseDir.indexOf('writeon') !== -1) {
	themeModule = "css!themes/" + window.theme;
}

// RequireJS entry point. By requiring synchronizer, publisher, sharing and
// media-importer, we are actually loading all the modules
require([
	"pace",
	"jquery",
	"rangy",
	"core",
	"eventMgr",
	"synchronizer",
	"publisher",
	"sharing",
	"mediaImporter",
	"css",
	"rangy-cssclassapplier",
	themeModule
], function(pace, $, rangy, core, eventMgr) {

	if(window.noStart) {
		return;
	}

	$(function() {

		//load the loader while WriteOn installs, updgrades, or loads
			// populate welcome message
			var welcome_msgs = [
				{"message": "Have a great day writing today."},
				{"message": "What good shall I do this day?"},
				{"message": "Remember to get up & stretch<br>once in a while."},
				{"message": "We’re all in this together."},
				{"message": "You look nice today."},
				{"message": "Thank you for using WriteOn.<br>We ♥ you!"},
				{"message": "Please enjoy WriteOn responsibly."},
				{"message": "Be cool. But also be warm."},
				{"message": "The mystery of life isn't a problem to solve, but a reality to experience."},
				{"message": "We like you."},
				{"message": "Please consider the environment before printing anything."},
				{"message": "Always get plenty of sleep, if you can."},
				{"message": "You're here! The day just got better."},
				{"message": "Alright world, time to take you on!"},
				{"message": "Each day will be better than the last. This one especially."},
				{"message": "What a day! What cannot be accomplished on such a splendid day?"},
			];
					
			var welcome_msg;
			
			if (!welcome_msg && welcome_msgs.length){
				welcome_msg = welcome_msgs[Math.round(Math.random() * (welcome_msgs.length - 1))];
			}
			
			var loading_welcome_msg = document.getElementById('hello_love');
			
			if (welcome_msg){
				loading_welcome_msg.innerHTML = welcome_msg.message;
			}
			
			// without this delay, the css transition does not happen!
			setTimeout(function() {
				loading_welcome_msg.style.opacity = 1;
			}, 10);	
		
		// Check if a new cache / version is available on page load.
		window.applicationCache.addEventListener('updateready', function() {
				if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
					window.applicationCache.swapCache();
					eventMgr.onMessage('A new version of WriteOn is available. Reload to upgrade.');
				}
		}, false);
		
        rangy.init();

		// Here, all the modules are loaded and the DOM is ready
		core.onReady();

        // Check if a new cache / version is available on page load.
        // If browser has detected a new application cache.
		if(window.applicationCache) {
			window.applicationCache.addEventListener('updateready', function() {
				if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
					window.applicationCache.swapCache();
					eventMgr.onMessage('A new version of WriteOn is available. Reload to upgrade.');
				}
			}, false);
		}
	});

});
