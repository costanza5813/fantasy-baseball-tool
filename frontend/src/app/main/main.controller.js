(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(playerData) {
    var vm = this;

    vm.gridOptions = {
      data: [],
      columnDefs: [],
      enableSorting: false,
      enableColumnMenus: false,
      enableFiltering: true,
    };

    playerData.getPlayers()
      .then(function(response) {
        vm.gridOptions.columnDefs = response.columns;
        vm.gridOptions.data = response.players;
      });

    vm.remove = function(row) {
      var index = vm.gridOptions.data.indexOf(row.entity);
      vm.gridOptions.data.splice(index, 1);
    };
  }
})();
