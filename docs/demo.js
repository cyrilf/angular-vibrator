'use strict';

angular.module('VibratorDemo', ['angular-vibrator'])
  // Configure the vibrator with your own sequences
  .config(['vibratorProvider', function(vibratorProvider) {

    var sequences = {
      twice: [200, 100, 300],
      long: 2500
    };

    vibratorProvider.setSequences(sequences);
  }])
  // Simple filter for displaying a checkmark
  // (this has nothing to do with this project, but it's cool for display)
  .filter('checkmark', function() {
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  })
  // Include the vibrator in your controller
  .controller('VibrationsCtrl', ['$scope', 'vibrator', function($scope, vibrator) {

    $scope.$on('vibrator:unsupportedBrowser', function() {
      console.log('Unsupported browser');
    });

    $scope.isSupported = vibrator.isSupported();
    $scope.duration    = vibrator.getSequences().default;


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