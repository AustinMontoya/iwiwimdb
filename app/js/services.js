'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').

  service("Title", ['$http', function ($http) {
    this.get = function (id) {
      var title = {};

      $http.get('/title/' + id)
        .success(function(res) {
          angular.extend(title, res);
        })

      return title;
    };

    this.findByName = function (nameFilter) {
      var titles = [];

      $http.get('/titles?name=' + encodeURIComponent(nameFilter))
        .success(function(res) {
          angular.forEach(res, function (item) {
            titles.push(item);
          });
        });

      return titles;
    };

  }]);
