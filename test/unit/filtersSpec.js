'use strict';

describe('filter', function() {
  beforeEach(module('myApp.filters'));

  describe('commaSeparated', function (){
    it('turns an array of strings into a single string with the array items separated by commas', inject(function($filter){
      var genres = ['Horror', 'Sci-Fi', 'Romance', 'Documentary'];
      var result = $filter('commaSeparated')(genres);
      expect(result).toEqual('Horror, Sci-Fi, Romance, Documentary');
    }));
  });
});
