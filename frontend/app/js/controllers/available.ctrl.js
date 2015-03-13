'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function AvailableCtrl(PitcherService) {

  // ViewModel
  var vm = this;
  vm.title = 'Available Players';

  PitcherService.get().then(function(data) {
      vm.pitchers = data;
  });
}

controllersModule.controller('AvailableCtrl', AvailableCtrl);
