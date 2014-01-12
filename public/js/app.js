'use strict';

angular.module('iwiwimdb', [
  'ngRoute',
  'ngAnimate',
  'iwiwimdb.filters',
  'iwiwimdb.services',
  'iwiwimdb.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/search', {
      templateUrl: 'partials/title-search.html', 
      controller: 'TitleSearchCtrl',
      reloadOnSearch: false
    });

  $routeProvider
    .when('/title/:titleId', {
      templateUrl: 'partials/title-detail.html', 
      controller: 'TitleDetailCtrl'
    });

  $routeProvider
    .when('/favorites', {
      templateUrl: 'partials/favorites.html',
      controller: 'FavoritesCtrl'
    });

  $routeProvider.otherwise({redirectTo: '/search'});
}]);
