'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('TitleSearchCtrl', ['Title', '$scope', '$location', function (Title, $scope, $location) {
    /* Scope variables */
    $scope.searchText = '';
    $scope.loaded = false; // Means the search has fired at least once

    /* Scope methods */
    $scope.filterByName = function() {
      Title.findByName($scope.searchText, function (results) {
        $scope.titles = results;
        $scope.loaded = true;
        updateLocation();
      });
    };

    /* Helper methods */

    // Enables deep linking based on search result
    function loadFromLocation() {
      $scope.searchText = $location.search().name;
      if ($scope.searchText) {
        $scope.filterByName();
      }
    }

    function updateLocation() {
      $location.search({name: $scope.searchText});
    }

    loadFromLocation();
  }])

  .controller('TitleDetailCtrl', ['Title', '$routeParams', '$scope', function (Title, $routeParams, $scope) {
    $scope.title = Title.get($routeParams.titleId);
  }]);