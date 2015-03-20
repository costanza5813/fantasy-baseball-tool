'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function PlayerService($q, $http) {

  var service = {};

  service.getPitchers = function() {
    var deferred = $q.defer();

    $http.get('./data/pitchers.json').success(function(data) {
        deferred.resolve(data);
    }).error(function(err, status) {
        console.log("Error getting the pitchers.");
        deferred.reject(err, status);
    });

    return deferred.promise;
  };

  service.getBatters = function() {
    var deferred = $q.defer();

    $http.get('./data/batters.json').success(function(data) {
        deferred.resolve(data);
    }).error(function(err, status) {
        console.log("Error getting the batters.");
        deferred.reject(err, status);
    });

    return deferred.promise;
  };

  return service;

}

servicesModule.service('PlayerService', PlayerService);
