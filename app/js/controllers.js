'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('TitleSearchCtrl', ['Title', function (Title) {
    $scope.searchText = '';

    $scope.filterByName = function() {
      $scope.titles = Title.findByName($scope.searchText);
    }

  }])

  .controller('TitleDetailCtrl', ['Title', '$routeParams', function (Title, $routeParams) {
    $scope.title = Title.get($routeParams.titleId);
  }]);