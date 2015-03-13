'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function PitcherService($q, $http) {

  var service = {};

  service.get = function() {
    var deferred = $q.defer();

    $http.get('./data/pitchers.json').success(function(data) {
        deferred.resolve(data);
    }).error(function(err, status) {
        console.log("Error getting the pitchers.");
        deferred.reject(err, status);
    });

    return deferred.promise;
  };

  return service;

}

servicesModule.service('PitcherService', PitcherService);
