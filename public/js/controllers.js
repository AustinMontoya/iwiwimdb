'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('TitleSearchCtrl', ['Title', '$scope', function (Title, $scope) {
    $scope.searchText = '';

    $scope.filterByName = function() {
      $scope.titles = Title.findByName($scope.searchText);
    }

  }])

  .controller('TitleDetailCtrl', ['Title', '$routeParams', '$scope', function (Title, $routeParams, $scope) {
    $scope.title = Title.get($routeParams.titleId);
  }]);