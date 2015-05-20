'use strict';
/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular.module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'mailchimp',
	'angulartics',
	'angulartics.google.tagmanager',
    'app.controllers',
	'auth0',
	'angular-storage', 
	'angular-jwt'

]).config(['$routeProvider', '$locationProvider', '$analyticsProvider', 'authProvider', 
    
    function($routeProvider, $locationProvider, $analyticsProvider, authProvider) {
        var routes, setRoutes;
        $authProvider.init({
    		domain: 'writeon.auth0.com',
    		clientID: 'p5xvPZdGVcK0ftTqBO5hcsirangc5dt8'
  		});
		$locationProvider.html5Mode(true);
        routes = [
            'home', 'main', 'features', 'privacy', 'beta', 'press', 
            'we/love-you',
            'design/theme', 'design/moodboard', '404'
        ];
    
        setRoutes = function(route) {
            var config, url;
            url = '/' + route;
            config = {
                templateUrl: 'views/' + route + '.html'
            };
    
            $routeProvider.when(url, config);
            return $routeProvider;
        };
    
        routes.forEach(function(route) {
            return setRoutes(route);
        });
    
        return $routeProvider
        .when('/', {
            templateUrl: 'views/home.html'
        }).when('/fG7tNpKU', {
            redirectTo: '/home'
        }).when('/main', {
            redirectTo: '/home'
        }).when('/login/', {
            redirectTo: 'https://beta.writeon.io/login'
        }).otherwise({
            templateUrl: 'views/404.html'
        });
		
		// Angulartics full path tracking
		$analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
        $analyticsProvider.withBase(true);  /* Records full path */
    }
]).run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
});