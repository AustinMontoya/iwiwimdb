'use strict';

/* jasmine specs for services go here */

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
      var titles = Title.findByName('i');
      $httpBackend.flush();
      expect(titles.length).toEqual(1);
    });

    it('gets a particular title by id', function () {
      var title = Title.get('abc123');
      $httpBackend.flush();
      expect(title.TitleId).toEqual('abc123');
    });

  });
});
