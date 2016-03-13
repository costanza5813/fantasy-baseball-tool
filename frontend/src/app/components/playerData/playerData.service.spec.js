(function() {
  'use strict';

  describe('service playerData', function() {
    var playerData;
    var $httpBackend;

    beforeEach(module('frontend'));
    beforeEach(inject(function(_playerData_, _$httpBackend_) {
      playerData = _playerData_;
      $httpBackend = _$httpBackend_;
    }));

    it('should be registered', function() {
      expect(playerData).not.toEqual(null);
    });

    xdescribe('getPlayers function', function() {
      it('should exist', function() {
        expect(playerData.getPlayers).not.toEqual(null);
      });

      it('should return data', function() {
        $httpBackend.when('GET', './assets/data/batters.json').respond(200, [{name: 'a'}]);
        $httpBackend.when('GET', './assets/data/pitchers.json').respond(200, [{name: 'b'}]);
        var data;
        playerData.getPlayers().then(function(fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Object));
        expect(data.hasOwnProperty('columns')).toBeTruthy();
        expect(data.hasOwnProperty('players')).toBeTruthy();
        expect(data.columns).toEqual(jasmine.any(Array));
        expect(data.players).toEqual(jasmine.any(Array));
        expect(data.players.length === 2).toBeTruthy();
        expect(data.players[0]).toEqual(jasmine.any(Object));
      });

      // it('should define a limit per page as default value', function() {
      //   $httpBackend.when('GET',  githubContributor.apiHost + '/contributors?per_page=30').respond(200, new Array(30));
      //   var data;
      //   githubContributor.getContributors().then(function(fetchedData) {
      //     data = fetchedData;
      //   });
      //   $httpBackend.flush();
      //   expect(data).toEqual(jasmine.any(Array));
      //   expect(data.length === 30).toBeTruthy();
      // });
      //
      // it('should log a error', function() {
      //   $httpBackend.when('GET',  githubContributor.apiHost + '/contributors?per_page=1').respond(500);
      //   githubContributor.getContributors(1);
      //   $httpBackend.flush();
      //   expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
      // });
    });
  });
})();
