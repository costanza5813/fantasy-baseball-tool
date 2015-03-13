'use strict';

/**
 * @ngInject
 */
function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Available', {
    url: '/available',
    controller: 'AvailableCtrl as available',
    templateUrl: 'available.tpl.html',
    title: 'Available Players'
  });

  $urlRouterProvider.otherwise('/available');

}

module.exports = Routes;
