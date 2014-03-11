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
    .provider('vibrator', function() {

      /********************************
       *            Private           *
       ********************************/

      // navigator will contain the $window.navigator
      var navigator;

      /**
       * Vibration sequences definition used by the vibrator
       * @type {Object}
       */
      var sequences = {
        default: 1000,
        twice: [200, 100, 200],
        long: 3000
      };


      /********************************
       * Public API for configuration *
       ********************************/

      /**
       * Set the sequences
       *  Useful for the configuration of this provider
       *  if you want to change the defaults sequences
       * @param {Object} userDefinedSequences
       */
      var setSequences = function(userDefinedSequences) {
        sequences = angular.extend(sequences, userDefinedSequences);
      };
      this.setSequences = setSequences;


      /********************************
       *       Private constructor    *
       ********************************/
      function Vibrator() {

        /**
         * Get the sequences
         * @return {Object} copy of the sequences object
         */
        this.getSequences = function() {
          return angular.copy(sequences);
        };

        /**
         * Set the sequences
         *  Useful for the configuration of this provider
         *  if you want to change the defaults sequences
         * @param {Object} userDefinedSequences
         */
        this.setSequences = setSequences;

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
            input = sequences.default;
          }
          if(this.isSupported()) {
            navigator.vibrate(input);
          }
        };

        /**
         * Vibrate twice
         */
        this.vibrateTwice = function() {
          this.vibrate(sequences.twice);
        };

        /**
         * Vibrate long
         */
        this.vibrateLong = function() {
          this.vibrate(sequences.long);
        };

        /**
         * Stop all vibrations
         */
        this.stop = function() {
          this.vibrate(0);
        };
      }


      /********************************
       *   Returned by the provider   *
       ********************************/

      this.$get = ['$window', function($window) {
        navigator = $window.navigator || {};
        return new Vibrator();
      }];
    });
})();