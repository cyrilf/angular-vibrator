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
      function Vibrator($window, $rootScope) {

        var navigator = $window.navigator || {};

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
         * @param  {Object}  navigatorOverride allows you to override the navigator
         *                                     (only useful for unit testing I guess)
         * @return {Boolean}                   is supported
         */
        this.isSupported = function(navigatorOverride) {
          navigator = navigatorOverride || navigator;
          var canVibrate = 'vibrate' in navigator || 'mozVibrate' in navigator;
          if(! canVibrate) {
            $rootScope.$broadcast('vibrator:unsupportedBrowser');
          }

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

      this.$get = ['$window', '$rootScope', function($window, $rootScope) {
        return new Vibrator($window, $rootScope);
      }];
    });
})();
