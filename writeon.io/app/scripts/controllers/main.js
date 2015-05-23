'use strict';
/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('app.controllers', ['auth0']).controller('WriteOnCtrl', function($scope, auth, store, $location) {

    function isMain() {
        return($location.path() === '/home') || ($location.path() === '/features') ? true : false;
    }

    function isInverse() {
        return($location.path() === '/privacy') ? true : false;
    }
    $scope.main = isMain();
    $scope.inverse = isInverse();
    $scope.isCollapsed = true;
    $scope.$on('$locationChangeStart', function() {
        $scope.main = isMain();
        $scope.inverse = isInverse();
    });
    $scope.$on('$routeChangeSuccess', function(e, nextRoute) {
        window.scrollTo(0, 0);
        $scope.thePath = $location.path();
		if ( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
      		$scope.pageTitle = nextRoute.$$route.pageTitle + ' | WriteOn Auth' ;
    	}
    });

}).controller('MainCtrl', function($scope, $location, $routeParams) { 
    $scope.full = ($routeParams.fG7tNpKU) ? true : false;
}).controller('NavController', function($scope, auth, store, $location) { 
	// Auth0.com Specific Controller logic
	$scope.login = function() {
    auth.signin({}, function(profile, token) {
      store.set('profile', profile);
      store.set('token', token);
      $location.path("/pad");
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  	}
	$scope.logout = function() {
  		auth.signout();
  		store.remove('profile');
  		store.remove('token');
	};
    $scope.go = function(url) {
        $location.path(url);
    };

}).controller('LoginController', function($scope, auth, store, $location) { // Auth0.com Specific Controller logic
    $scope.login = function() {
            auth.signin({}, function(profile, token) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                $location.path('/pad');
            }, function() {
                // Error callback
            });
    };
	$scope.logout = function() {
  		auth.signout();
  		store.remove('profile');
  		store.remove('token');
	};
});