'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function AvailableCtrl($filter, $q, ngTableParams, PlayerService) {

  // ViewModel
  var vm = this;
  vm.title = 'Available Players';
  
  vm.hasBatters = false;
  vm.hasPitchers = false;

  $q.all([
    PlayerService.getPitchers(),
    PlayerService.getBatters()
  ]).then(function(data) {
      vm.players = data[0].concat(data[1]);

      vm.tableParams = new ngTableParams({
        page: 1,
        count: 25,
        sorting: {
          pts: 'desc'
        },
        filter: {
          name: ''
        }
      }, 
      {
        total: vm.players.length,
        getData: function($defer, params) {
          var orderedData = params.sorting() ? $filter('orderBy')(vm.players, params.orderBy()) : vm.players;
          var filteredData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
          params.total(filteredData.length);
          $defer.resolve(filteredData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
  });
}

controllersModule.controller('AvailableCtrl', AvailableCtrl);
