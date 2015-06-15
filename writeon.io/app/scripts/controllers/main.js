'use strict';
/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('app.controllers', []).controller('WriteOnCtrl', function($scope, $location) {

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
    $scope.$on('$routeChangeSuccess', function() {
        window.scrollTo(0, 0);
        $scope.thePath = $location.path();
    });

}).controller('MainCtrl', function($rootScope, $location, $window, $scope, $routeParams) { 
    $scope.full = ($routeParams.fG7tNpKU) ? true : false;
	/* jshint ignore:start */
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (next && next.$$route && next.$$route.originalPath === '/login') {
        // Stops the ngRoute to proceed
        event.preventDefault();
        // We have to do it async so that the route callback 
        // can be cleanly completed first, so $timeout works too
        $rootScope.$evalAsync(function() {
          // next.$$route.redirectTo would equal be '/login'
          $window.location.href = next.$$route.redirectTo;
        });
      } else if (next && next.$$route && next.$$route.originalPath === '/register') {
        // Stops the ngRoute to proceed
        event.preventDefault();
        // We have to do it async so that the route callback 
        // can be cleanly completed first, so $timeout works too
        $rootScope.$evalAsync(function() {
          // next.$$route.redirectTo would equal be '/login'
          $window.location.href = next.$$route.redirectTo;
        });
      }
  	});
	/* jshint ignore:end */
    $scope.go = function(url) {
        $location.path(url);
    };
}).controller('NavController', function() { 

});
