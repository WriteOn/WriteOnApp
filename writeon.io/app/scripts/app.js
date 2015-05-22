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
	'auth0',
	'angular-storage', 
	'angular-jwt',
    'app.controllers'

]).config(['$routeProvider', '$locationProvider', '$analyticsProvider', 'authProvider', 'jwtInterceptorProvider',   
    
    function($routeProvider, $locationProvider, $analyticsProvider, authProvider, jwtInterceptorProvider) {
        var routes, setRoutes;
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
        $analyticsProvider.withBase(true); /* Records full path */
    
		// Auth0 authentication
		authProvider.init({
    		domain: 'writeon.auth0.com',
    		clientID: 'p5xvPZdGVcK0ftTqBO5hcsirangc5dt8'
  		});
		jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    		return store.get('token');
  		}];
  		// Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
  		// NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
  		// want to check the delegation-token example$httpProvider.interceptors.push('jwtInterceptor');
	
	}
]).run(function($rootScope, auth, store, jwtHelper, $location) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          $location.path('/login');
        }
      }
    }

  });
});