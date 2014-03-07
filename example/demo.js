'use strict';

angular.module('VibratorDemo', ['angular-vibrator'])
  .controller('VibrationsCtrl', ['$scope', 'vibrator', function($scope, vibrator){
    $scope.duration = 1000;

    $scope.vibrate = function(duration) {
      vibrator.vibrate(duration);
    };

    $scope.vibrateTwice = function() {
      vibrator.vibrateTwice();
    };

    $scope.stop = function() {
      vibrator.stop();
    };
  }]);