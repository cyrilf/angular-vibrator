'use strict';

describe('Service: vibrator', function () {

  // Load the service's module
  beforeEach(module('angular-vibrator'));

  /**
   * Configuration tests
   */
  describe('Vibrator provider configuration tests', function() {

    describe('Default configuration', function () {
      it('should have valid default sequences', function () {
        inject(function(vibrator) {
          expect(vibrator.getSequences().default).toBe(1000);
          expect(vibrator.getSequences().twice).toEqual([200, 100, 200]);
          expect(vibrator.getSequences().long).toBe(3000);
        });
      });
    });

    describe('Custom configuration', function () {
      it('should override default sequences value', function () {
        module(function(vibratorProvider) {
            // Configure the provider
          vibratorProvider.setSequences({default: 1500});
          return;
        });

        inject(function(vibrator) {
          // Check that the configuration worked
          expect(vibrator.getSequences().default).toBe(1500);
        });
      });

      it('should override all sequences values', function () {
        var myCustomConf = {
          default: 1500,
          twice: [3, 7],
          long: 7000
        };

        module(function(vibratorProvider) {
            // Configure the provider
          vibratorProvider.setSequences(myCustomConf);
          return;
        });

        inject(function(vibrator) {
          // Check that the configuration worked
          var sequences = vibrator.getSequences();
          expect(sequences.default).toBe(1500);
          expect(sequences.twice).toEqual([3, 7]);
          expect(sequences.long).toBe(7000);
        });
      });
    });
  });

  /**
   * Provider tests
   */
  describe('Vibrator provider tests', function() {

    // Instantiate service
    var vibrator, $rootScope;
    beforeEach(inject(function (_vibrator_, _$rootScope_) {
      vibrator   = _vibrator_;
      $rootScope = _$rootScope_;
    }));

    it('should be defined', function () {
      expect(!!vibrator).toBe(true);
    });

    describe('API functionalities', function() {

      it('should have a getSequences method', function() {
        expect(typeof vibrator.getSequences).toBe('function');
      });

      it('should have a setSequences method', function() {
        expect(typeof vibrator.setSequences).toBe('function');
      });

      it('should have a isSupported method', function() {
        expect(typeof vibrator.isSupported).toBe('function');
      });

      it('should have a vibrate method', function() {
        expect(typeof vibrator.vibrate).toBe('function');
      });

      it('should have a vibrateTwice method', function() {
        expect(typeof vibrator.vibrateTwice).toBe('function');
      });

      it('should have a vibrateLong method', function() {
        expect(typeof vibrator.vibrateLong).toBe('function');
      });

      it('should have a stop method', function() {
        expect(typeof vibrator.stop).toBe('function');
      });
    });

    describe('Functionality testing', function() {

      describe('isSupported functionality', function() {

        beforeEach(function() {
          spyOn($rootScope, '$broadcast').andCallThrough();
          $rootScope.$broadcast.reset();
        });

        it('should return true if the navigator supports the vibration API', function() {
          var supportedNavigator = { vibrate: true };
          expect(vibrator.isSupported(supportedNavigator)).toBe(true);
        });

        it('should not broadcast an error if the navigator supports the vibration API', function() {
          var supportedNavigator = { vibrate: true };
          expect(vibrator.isSupported(supportedNavigator)).toBe(true);
          expect($rootScope.$broadcast).not.toHaveBeenCalled();
        });

        it('should return false if the navigator doesn\'t supports the vibration API', function() {
          var unsupportedNavigator = {};
          expect(vibrator.isSupported(unsupportedNavigator)).toBe(false);
        });

        it('should broadcast an error if the navigator doesn\'t supports the vibration API', function() {
          var unsupportedNavigator = {};
          expect(vibrator.isSupported(unsupportedNavigator)).toBe(false);
          expect($rootScope.$broadcast).toHaveBeenCalledWith('vibrator:unsupportedBrowser');
        });
      });

      it('should correctly implement getSequences', function() {
        var sequences = vibrator.getSequences();
        expect(sequences).toBeDefined();
        var defaultSequences = {
          default: 1000,
          twice: [200, 100, 200],
          long: 3000
        };
        expect(sequences).toEqual(defaultSequences);
      });

      it('should correctly implement setSequences', function() {
        var mySequences = {
          default: 1500,
          twice: [3, 7],
          long: 7000
        };

        vibrator.setSequences(mySequences);
        expect(vibrator.getSequences()).toEqual(mySequences);
      });
    });

    describe('Vibrate is the main function', function() {
      beforeEach(function() {
        spyOn(vibrator, 'vibrate').andCallThrough();
        vibrator.vibrate.reset();
      });

      it('should have been called by vibrateTwice', function() {
        vibrator.vibrateTwice();
        var twiceSequence = vibrator.getSequences().twice;
        expect(vibrator.vibrate).toHaveBeenCalledWith(twiceSequence);
      });

      it('should have been called by vibrateLong', function() {
        vibrator.vibrateLong();
        var longSequence = vibrator.getSequences().long;
        expect(vibrator.vibrate).toHaveBeenCalledWith(longSequence);
      });

      it('should have been called by stop', function() {
        vibrator.stop();
        expect(vibrator.vibrate).toHaveBeenCalledWith(0);
      });
    });
  });
});