'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).

  service("Title", ['$http', '$q', function ($http, $q) {
    this.get = function (id) {
      var title = {};

      $http.get('/title/' + id)
        .success(function(res) {
          angular.extend(title, res);
        });

      return title;
    };

    this.findByName = function (nameFilter, callback) {
      $http.get('/titles?name=' + encodeURIComponent(nameFilter)).success(callback);
    };

  }]);
