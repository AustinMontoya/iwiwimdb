'use strict';

/* Services */
angular.module('myApp.services', []).

  service("Title", ['$http', '$q', function ($http, $q) {
    this.get = function (id, callback) {
      $http.get('/title/' + id).success(callback);
    };

    this.findByName = function (nameFilter, callback) {
      $http.get('/titles?name=' + encodeURIComponent(nameFilter)).success(callback);
    };

  }]);
