'use strict';

describe('service', function() {
  var Title, $httpBackend;
  beforeEach(module('myApp.services'));
  
  describe('Titles', function () {
    beforeEach(inject(function(_$httpBackend_, _Title_){
      Title = _Title_;
      $httpBackend = _$httpBackend_;

      $httpBackend
        .when('GET', '/titles?name=i')
        .respond([{
          Name: 'indiana jones',
          TitleId: '1'
        }]);

      $httpBackend
        .when('GET', '/title/abc123')
        .respond({
          TitleId: 'abc123',
          foo: 'boar'
        });
    }));

    it('fetches a list of titles containing "name"', function () {
      var titles;

      Title.findByName('i', function(results) { titles = results; });
      $httpBackend.flush();

      expect(titles.length).toEqual(1);
    });

    it('gets a particular title by id', function () {     
      var title;

      Title.get('abc123', function (result) { title = result; });
      $httpBackend.flush();

      expect(title.TitleId).toEqual('abc123');
    });

  });

  describe('Favorites', function () {
    var Favorites;
    var testRecords = [
      {id: 12345, name: 'Iron Man'},
      {id: 34567, name: 'Battle Royale'}
    ];

    function getFavoritesInStorage() {
      var items = localStorage.getItem('favorites');
      return items ? JSON.parse(items) : [];
    }

    beforeEach(function () {
      localStorage.setItem('favorites', JSON.stringify(testRecords));

      inject(function (_Favorites_) {
        Favorites = _Favorites_;
      });
    });

    afterEach(function() {
      localStorage.removeItem('favorites');
    });

    it('adds a favorite', function () {
      Favorites.add(1234558, 'Iron Man 2');
      var actualItems = getFavoritesInStorage();
      expect(actualItems[2].name).toEqual('Iron Man 2');
    });

    it('removes a favorite', function () {
      Favorites.remove(testRecords[0].id);

      var actualItems = getFavoritesInStorage();
      expect(actualItems.length).toEqual(1);
    });

    it('gets a list of current favorites', function () {
      var favorites = Favorites.getAll();
      expect(favorites.length).toEqual(testRecords.length);
    });

    it('identifies whether a favorite exists', function () {
      var exists = Favorites.isFavorite(testRecords[0].id);
      expect(exists).toEqual(true);

      exists = Favorites.isFavorite(4848343); // not an id in the test records
      expect(exists).toEqual(false);
    });
  });
});
