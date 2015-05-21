'use strict';
/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('app.controllers', []).controller('WriteOnCtrl', function($scope, $location) {
    // LoginCtrl.js
    function LoginCtrl($scope, auth, store, $location) {
        $scope.login = function() {
            auth.signin({}, function(profile, token) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                $location.path('/pad');
            }, function() {
                // Error callback
            });
        }
    }

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
}).controller('MainCtrl', function($scope, $location, $routeParams) {
    $scope.full = ($routeParams.fG7tNpKU) ? true : false;
}).controller('NavController', function($scope, $location) {
    $scope.go = function(url) {
        $location.path(url);
    };
});