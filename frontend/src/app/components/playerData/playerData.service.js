(function() {
  'use strict';

  angular
    .module('frontend')
    .factory('playerData', playerData);

  /** @ngInject */
  function playerData($http, $log, $q) {
    var batters = null, pitchers = null;

    var deleteButton = '<button aria-label="Close Account Info Modal Box" ' +
                       '        ng-click="grid.appScope.main.remove(row)">&times;</button>';
    var commonColumns = [
      {displayName: '', field: 'x', cellTemplate: deleteButton, sortable: false, width: 25 },
      {displayName: 'NAME', field: 'name', width: '*'},
      {displayName: 'TEAM', field: 'team'},
      {displayName: 'POS', field: 'pos'},
      {displayName: 'STATUS', field: 'status', width: 90 },
      {displayName: 'PTS', field: 'pts'}
    ];

    var batterColumns = [
      {displayName: 'R', field: 'r' },
      {displayName: '1B', field: 'singles'},
      {displayName: '2B', field: 'doubles'},
      {displayName: '3B', field: 'triples'},
      {displayName: 'HR', field: 'hr'},
      {displayName: 'RBI', field: 'rbi'},
      {displayName: 'BB', field: 'bb'},
      {displayName: 'SB', field: 'sb'}
    ];

    var pitcherColumns = [
      {displayName: 'IP', field: 'ip' },
      {displayName: 'ER', field: 'er'},
      {displayName: 'K', field: 'k'},
      {displayName: 'CG', field: 'cg'},
      {displayName: 'SO', field: 'so'},
      {displayName: 'W', field: 'w'},
      {displayName: 'SV', field: 'sv'}
    ];

    var service = {
      getPlayers: getPlayers
    };

    return service;

    function getPlayers(pos) {
      var hasBatters = containsBatters(pos);
      var hasPitchers = containsPitchers(pos);

      return $q.all([fetchBatters(), fetchPitchers()])
        .then(fetchPlayersComplete)
        .catch(fetchPlayersFailed);

      function fetchPlayersComplete(response) {
        var columns = commonColumns;
        var players = [];
        if (hasBatters && !hasPitchers) {
          columns = _.concat(columns, batterColumns);
          players = response[0].data;
        } else if (!hasBatters && hasPitchers) {
          columns = _.concat(columns, pitcherColumns);
          players = response[1].data;
        } else {  // mixture of batters and pitchers
          players = _.concat(response[0].data, response[1].data);
        }

        players = _.orderBy(players, ['pts'], ['desc']);

        return {
          columns: columns,
          players: _.filter(players, function(o) { return !o.selected; })
        };
      }

      function fetchPlayersFailed(error) {
        $log.error('Failed fetching players.\n' + angular.toJson(error, true));
      }
    }

    function fetchBatters() {
      if (batters) {
        return $q.resolve(batters);
      } else {
        return $http.get('./assets/data/batters.json');
      }
    }

    function fetchPitchers() {
      if (pitchers) {
        return $q.resolve(pitchers);
      } else {
        return $http.get('./assets/data/pitchers.json');
      }
    }

    function containsBatters(pos) {
      return (_.intersection(pos, ['C', '1B', '2B', '3B', 'SS', 'OF', 'DH']).length > 0);
    }

    function containsPitchers(pos) {
      return (_.intersection(pos, ['RP', 'SP']).length > 0);
    }
  }
})();
