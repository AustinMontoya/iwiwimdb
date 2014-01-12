'use strict';

/* Services */
angular.module('iwiwimdb.services', []).

  service("Title", ['$http', '$q', function ($http, $q) {
    this.get = function (id, callback) {
      $http.get('/title/' + id).success(callback);
    };

    this.findByName = function (nameFilter, callback) {
      $http.get('/titles?name=' + encodeURIComponent(nameFilter)).success(callback);
    };

  }])

  .service("Favorites", function () {
    var favorites, favesFromStorage;

    favesFromStorage = localStorage.getItem('favorites');
    favorites = favesFromStorage ? JSON.parse(favesFromStorage) : [];

    function save() {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function getIndexById(id) {
      var i;

      for (i = 0; i < favorites.length; i++) {
        if (favorites[i].id === id) {
          return i;
        }
      }

      return -1;
    }

    this.add = function (id, name) {
      favorites.push({id: id, name: name});
      save();
    };

    this.remove = function (id) {
      var index = getIndexById(id);
      if (index > -1) {
        favorites.splice(index, 1);
      }

      save();
    };

    this.getAll = function() {
      return favorites;
    };

    this.isFavorite = function (id) {
      return getIndexById(id) > -1;
    };

  });
