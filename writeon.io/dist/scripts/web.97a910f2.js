"use strict";angular.module("angularApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","mailchimp","angulartics","angulartics.google.tagmanager","app.controllers"]).config(["$routeProvider","$locationProvider","$analyticsProvider",function(a,b,c){var d,e;return b.html5Mode(!0),d=["home","main","features","privacy","beta","press","we/love-you","design/theme","design/moodboard","404"],e=function(b){var c,d;return d="/"+b,c={templateUrl:"views/"+b+".html"},a.when(d,c),a},d.forEach(function(a){return e(a)}),a.when("/go",{controller:function(){window.location.replace("/pad")},template:"<div></div>"}).when("/start",{controller:function(){window.location.replace("/register")},template:"<div></div>"}).when("/",{templateUrl:"views/home.html"}).when("/fG7tNpKU",{redirectTo:"/home"}).when("/main",{redirectTo:"/home"}).otherwise({templateUrl:"views/404.html"})}]),angular.module("app.controllers",[]).controller("WriteOnCtrl",["$scope","$location",function(a,b){function c(){return"/home"===b.path()||"/features"===b.path()?!0:!1}function d(){return"/privacy"===b.path()?!0:!1}a.main=c(),a.inverse=d(),a.isCollapsed=!0,a.$on("$locationChangeStart",function(){a.main=c(),a.inverse=d()}),a.$on("$routeChangeSuccess",function(){window.scrollTo(0,0),a.thePath=b.path()})}]).controller("MainCtrl",["$rootScope","$location","$window","$scope","$routeParams",function(a,b,c,d,e){d.full=e.fG7tNpKU?!0:!1,a.$on("$routeChangeStart",function(b,d,e){d&&d.$$route&&"/login"===d.$$route.originalPath?(b.preventDefault(),a.$evalAsync(function(){c.location.href=d.$$route.redirectTo})):d&&d.$$route&&"/register"===d.$$route.originalPath&&(b.preventDefault(),a.$evalAsync(function(){c.location.href=d.$$route.redirectTo}))}),d.go=function(a){b.path(a)}}]).controller("NavController",function(){});