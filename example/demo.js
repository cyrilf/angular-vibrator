'use strict';

angular.module('VibratorDemo', ['angular-vibrator'])
  .config(['vibratorProvider', function(vibratorProvider) {

    // Define your own sequences
    var sequences = {
      twice: [200, 100, 300],
      long: 2500
    };

    vibratorProvider.setSequences(sequences);
  }])
  .controller('VibrationsCtrl', ['$scope', 'vibrator', function($scope, vibrator){
    $scope.duration = vibrator.getSequences().default;

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