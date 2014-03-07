# Angular Vibrator

####Angular Vibrator is an angular wrapper for the vibration API

You want to use the [vibration API](http://www.w3.org/TR/vibration/) on your Angular application? You're at the right place.

## Installation

#### via bower:
```
$ bower install angular-vibrator
```
#### via npm:
```
$ npm install angular-vibrator
```

## Usage

Include the vibrator as a dependency for your app.

```js
angular.module('yourApp', ['angular-vibrator'])
```

then use `vibrator` service as a dependency

```js
 .controller('VibrationsCtrl', ['$scope', 'vibrator', function($scope, vibrator){

   $scope.vibrate = function(duration) {
     vibrator.vibrate(duration);
   };
 }]);
```

Checkout the [example](https://github.com/cyrilf/angular-vibrator/tree/master/example) folder for more informations/tips.

## License

  Licensed under the MIT license

[Cyril F - Web developer](http://cyrilf.com)