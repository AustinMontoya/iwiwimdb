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

  .controller('TitleDetailCtrl', ['Title', 'Favorites', '$routeParams', '$scope', function (Title, Favorites, $routeParams, $scope) {
    Title.get($routeParams.titleId, function (title) {
      $scope.title = title;
      $scope.isFavorite = Favorites.isFavorite(title.TitleId);
      $scope.keyParticipants = getKeyParticipants(title); // for convenience
    });

    $scope.addFavorite = function () {
      Favorites.add($scope.title.TitleId, $scope.title.TitleName);
      $scope.isFavorite = true;
    };

    $scope.removeFavorite = function() {
      Favorites.remove($scope.title.TitleId);
      $scope.isFavorite = false;
    };

    function getKeyParticipants(title) {
      return title.Participants
        .filter(function (participant) { 
          return participant.IsKey; })
        .map(function (participant) {
          return {
            RoleType: participant.RoleType,
            Name: participant.Name  
          }; });
    }

  }])

  .controller('FavoritesCtrl', ['Favorites', '$scope', function (Favorites, $scope){
    $scope.favorites = Favorites.getAll();
    $scope.remove = Favorites.remove;
  }])

  .controller('NavigationCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    var currentRoute;

    $scope.nav = {
      '/search': {
        label: 'Search',
        active: false
      },
      '/favorites': {
        label: 'Favorites',
        active: false
      }
    };

    $rootScope.$on('$routeChangeSuccess', function (e, current) {
      var newRoute = $location.path();
      if (!$scope.nav[newRoute]) {
        return; // We only want routes currently in our navbar
      }

      if ($scope.nav[currentRoute]) {
        $scope.nav[currentRoute].active = false;  
      }
      
      $scope.nav[newRoute].active = true;
      currentRoute = newRoute;
    });
  }]);