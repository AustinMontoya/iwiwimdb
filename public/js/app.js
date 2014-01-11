'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/search', 
      {
        templateUrl: 'partials/title-search.html', 
        controller: 'TitleSearchCtrl',
        reloadOnSearch: false
      });

  $routeProvider
    .when('/title/:titleId', 
      {
        templateUrl: 'partials/title-detail.html', 
        controller: 'TitleDetailCtrl'
      });

  $routeProvider.otherwise({redirectTo: '/search'});
}]);
