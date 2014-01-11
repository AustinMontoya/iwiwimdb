'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('commaSeparated', function() {
    return function(items) {
      return items.join(', ');
    };
  });
