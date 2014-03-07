'use strict';

describe('Service: vibrator', function () {

  // load the service's module
  beforeEach(module('angular-vibrator'));

  // instantiate service
  var vibrator;
  beforeEach(inject(function (_vibrator_) {
    vibrator = _vibrator_;
  }));

  it('should be defined', function () {
    expect(!!vibrator).toBe(true);
  });

  describe('API functionalities', function() {

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

  describe('Vibrate is the main function', function() {
    beforeEach(function() {
      spyOn(vibrator, 'vibrate').andCallThrough();
      vibrator.vibrate.reset();
    });

    it('should have been called by vibrateTwice', function() {
      vibrator.vibrateTwice();
      var twiceSequence = vibrator.sequences.twice;
      expect(vibrator.vibrate).toHaveBeenCalledWith(twiceSequence);
    });

    it('should have been called by vibrateLong', function() {
      vibrator.vibrateLong();
      var longSequence = vibrator.sequences.long;
      expect(vibrator.vibrate).toHaveBeenCalledWith(longSequence);
    });

    it('should have been called by stop', function() {
      vibrator.stop();
      expect(vibrator.vibrate).toHaveBeenCalledWith(0);
    });
  });
});