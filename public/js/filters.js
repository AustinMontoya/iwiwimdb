'use strict';

/* Filters */

angular.module('iwiwimdb.filters', []).
  filter('commaSeparated', function() {
    return function(items) {
      return items.join(', ');
    };
  });
