'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('iwiwimdb.controllers'));
  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  describe('TitleSearchCtrl', function() {
    beforeEach(inject(function($controller, $location) {
      var mockTitleService = {
        findByName: function(text, callback) {
          callback([{id: 12345}, {id: 23456}]);
        }
      };

      $location.search({name: 'foo'});
      $controller('TitleSearchCtrl', { $scope: scope, Title: mockTitleService });
    }));

    it('gets results when search is performed', function() {
      scope.filterByName();
      expect(scope.titles.length).toEqual(2);
    });

    it('loads based on initial queryString params', function() {
      expect(scope.searchText).toEqual('foo');
    });

    it('changes the queryString when a search is performed', inject(function($location){
      scope.searchText = 'bar';
      scope.filterByName();
      expect($location.search().name).toEqual('bar');
    }));
  });

  describe('TitleDetailCtrl', function(){

    beforeEach(inject(function($controller){
      var mockFavoritesService = {
        add: function(){},
        remove: function(){},
        isFavorite: function(){},
      };

      spyOn(mockFavoritesService, 'isFavorite').andReturn(true);

      var mockTitleService = {
        get: function(id, callback) {
          return callback({
            TitleId: 12345,
            Name: 'Iron Man',
            Participants: [{
              IsKey: true,
              RoleType: 'Actor',
              Name: 'Robert Downey Jr.'
            }]
          });
        }
      };

      $controller('TitleDetailCtrl', { $scope: scope, Favorites: mockFavoritesService, Title: mockTitleService});
    }));

    it('gets the title when initializing', function() {
      expect(scope.title).toBeDefined();
    });

    it('loads key participants when initializing', function() {
      expect(scope.keyParticipants[0].Name).toEqual('Robert Downey Jr.');
    });

    it('checks to see whether the title is a favorite when initializing', function() {
      expect(scope.isFavorite).toEqual(true);
    });

    it('adds a favorite', function(){
      scope.addFavorite();
      expect(scope.isFavorite).toEqual(true);
    });

    it('removes a favorite', function(){
      scope.isFavorite = true;
      scope.removeFavorite();
      expect(scope.isFavorite).toEqual(false);
    });
  });

  describe('NavigationCtrl', function(){
    beforeEach(inject(function($controller){
      $controller('NavigationCtrl', { $scope: scope });
    }));

    it('updates the active route when the url changes', inject(function($location){
      $location.path('/search');
      scope.$root.$broadcast('$routeChangeSuccess');
      expect(scope.activeRoute).toEqual('/search');
    }));
  });
});