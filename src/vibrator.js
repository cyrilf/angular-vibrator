/**
 * angular-vibrator
 *
 * Wrapper for the Vibration API (http://www.w3.org/TR/vibration/)
 * Allows to run/stop vibrations on your device
 *
 * by @cyrilf
 * License: MIT
 */

(function() {

  'use strict';

  // Alias the vibrator so it can be included using a simpler
  // (and maybe more professional) module name:
  angular.module('angular-vibrator', ['cyrilf.vibrator']);

  angular.module('cyrilf.vibrator', [])

  /**
   * Vibrator
   */
  .service('vibrator', ['$window', function vibrator($window) {

    var navigator = $window.navigator || {};

    /**
     * Vibration sequences definition used by the vibrator
     * @type {Object}
     */
    this.sequences = {
      default: 1000,
      twice: [200, 100, 200],
      long: 3000
    };

    /**
     * Either vibration API is supported by the navigator or not
     * @return {Boolean} is supported
     */
    this.isSupported = function() {
      var canVibrate = 'vibrate' in navigator || 'mozVibrate' in navigator;
      return canVibrate;
    };

    // Normalize the navigator.vibrate calls
    if(this.isSupported()  && !(('vibrate') in navigator)) {
      navigator.vibrate = navigator.mozVibrate;
    }

    /**
     * Run a vibration
     * @param  {int, array} input
     *     int: vibration duration (in milliseconds) (i.e.: 1000)
     *     array: vibration duration, pause duration, vibration duration, ..
     *             (i.e.: [200, 100, 200]) or [300, 10, 200, 100, 20])
     */
    this.vibrate = function(input) {
      if(typeof(input) === 'undefined') {
        input = this.sequences.default;
      }
      if(this.isSupported()) {
        navigator.vibrate(input);
      }
    };

    /**
     * Vibrate twice
     */
    this.vibrateTwice = function() {
      this.vibrate(this.sequences.twice);
    };

    /**
     * Vibrate long
     */
    this.vibrateLong = function() {
      this.vibrate(this.sequences.long);
    };

    /**
     * Stop all vibrations
     */
    this.stop = function() {
      this.vibrate(0);
    };
  }]);
})();