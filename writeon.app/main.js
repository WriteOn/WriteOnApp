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
			location: 'bower-libs/require-css',
			main: 'css'
		},
		{
			name: 'less',
			location: 'bower-libs/require-less',
			main: 'less'
		}
	],
	paths: {
		jquery: 'bower-libs/jquery/dist/jquery.min',
		underscore: 'bower-libs/underscore/underscore',
		crel: 'bower-libs/crel/crel',
		jgrowl: 'bower-libs/jgrowl/jquery.jgrowl',
		mousetrap: 'bower-libs/mousetrap/mousetrap',
		'mousetrap-record': 'bower-libs/mousetrap/plugins/record/mousetrap-record',
		toMarkdown: 'bower-libs/to-markdown/src/to-markdown',
		text: 'bower-libs/requirejs-text/text',
		bootstrap: 'bower-libs/bootstrap/dist/js/bootstrap',
		material_ripples: 'bower-libs/bootstrap-material-design/dist/js/ripples.min',
		bootstrap_material: 'bower-libs/bootstrap-material-design/dist/js/bootstrap.material.min',
		requirejs: 'bower-libs/requirejs/require',
		domReady: 'bower-libs/requirejs-domready/domReady',
		'google-code-prettify': 'bower-libs/google-code-prettify/src/prettify',
		highlightjs: 'libs/highlight/highlight.pack',
		'jquery-waitforimages': 'bower-libs/waitForImages/src/jquery.waitforimages',
		'jquery-ui': 'bower-libs/jquery-ui/ui/jquery-ui',
		'jquery-ui-core': 'bower-libs/jquery-ui/ui/jquery.ui.core',
		'jquery-ui-widget': 'bower-libs/jquery-ui/ui/jquery.ui.widget',
		'jquery-ui-mouse': 'bower-libs/jquery-ui/ui/jquery.ui.mouse',
		'jquery-ui-draggable': 'bower-libs/jquery-ui/ui/jquery.ui.draggable',
		'jquery-ui-effect': 'bower-libs/jquery-ui/ui/jquery.ui.effect',
		'jquery-ui-effect-slide': 'bower-libs/jquery-ui/ui/jquery.ui.effect-slide',
		FileSaver: 'bower-libs/FileSaver/FileSaver',
		stacktrace: 'bower-libs/stacktrace/stacktrace',
		'requirejs-text': 'bower-libs/requirejs-text/text',
		'bootstrap-tour': 'bower-libs/bootstrap-tour/build/js/bootstrap-tour',
		'Slider': 'bower-libs/seiyria-bootstrap-slider/dist/bootstrap-slider.min',
		css_browser_selector: 'bower-libs/css_browser_selector/css_browser_selector',
		'pagedown-extra': 'bower-libs/pagedown-extra/node-pagedown-extra',
		pagedownExtra: 'bower-libs/pagedown-extra/Markdown.Extra',
		pagedown: 'libs/Markdown.Editor',
		'require-css': 'bower-libs/require-css/css',
		xregexp: 'bower-libs/xregexp/xregexp-all',
		yaml: 'bower-libs/yaml.js/bin/yaml',
		'yaml.js': 'bower-libs/yaml.js',
		'yaml-js': 'bower-libs/yaml.js/bin/yaml',
		css: 'bower-libs/require-css/css',
		'css-builder': 'bower-libs/require-css/css-builder',
		normalize: 'bower-libs/require-css/normalize',
		prism: 'bower-libs/prism/prism',
		'prism-core': 'bower-libs/prism/components/prism-core',
		MutationObservers: 'bower-libs/MutationObservers/MutationObserver',
		WeakMap: 'bower-libs/WeakMap/weakmap',
		rangy: 'bower-libs/rangy/rangy-core',
		'rangy-cssclassapplier': 'bower-libs/rangy/rangy-cssclassapplier',
		diff_match_patch: 'bower-libs/google-diff-match-patch-js/diff_match_patch',
		diff_match_patch_uncompressed: 'bower-libs/google-diff-match-patch-js/diff_match_patch_uncompressed',
		jsondiffpatch: 'bower-libs/jsondiffpatch/build/bundle',
		hammerjs: 'bower-libs/hammerjs/hammer',
		Diagram: 'bower-libs/js-sequence-diagrams/src/sequence-diagram',
		'diagram-grammar': 'bower-libs/js-sequence-diagrams/build/diagram-grammar',
		raphael: 'bower-libs/raphael/raphael',
		'flow-chart': 'bower-libs/flowchart/release/flowchart.amd-1.2.10.min',
		flowchart: 'bower-libs/flowchart/release/flowchart-1.2.10.min',
		monetizejs: 'bower-libs/monetizejs/src/monetize',
		'to-markdown': 'bower-libs/to-markdown/src/to-markdown',
		waitForImages: 'bower-libs/waitForImages/dist/jquery.waitforimages',
		alertify: 'bower-libs/alertify.js/lib/alertify',
        oauth: 'bower-libs/oauth-js/dist/oauth',
        couchdb: 'libs/jquery.couch',
        contextjs: 'bower-libs/Context.js/context',
        'dropdown-hover': 'bower-libs/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js'
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
		'bower-libs/prism/components/prism-markup': [
			'prism-core'
		],
		'libs/prism-latex': [
			'prism-core'
		],
		'libs/prism-markdown': [
			'bower-libs/prism/components/prism-markup',
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
if(window.baseDir.indexOf('-min') !== -1) {
	themeModule = "css!themes/" + window.theme;
}

// RequireJS entry point. By requiring synchronizer, publisher, sharing and
// media-importer, we are actually loading all the modules
require([
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
], function($, rangy, core, eventMgr) {

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
					eventMgr.onMessage('A new version of WriteOn is available.\nJust reload this tab when you are ready to upgrade.');
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
					eventMgr.onMessage('A new version of WriteOn is available.\nJust reload this tab when you are ready to upgrade.');
				}
			}, false);
		}
	});

});
