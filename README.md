# Angular Vibrator

####Angular Vibrator is an angular wrapper for the vibration API

You want to use the [vibration API](http://www.w3.org/TR/vibration/) on your Angular application? You're at the right place.

## Demo

If you're like me, you're happy when there is some demos.
<br>
So, you can [see Angular Vibrator live](http://cyrilf.github.io/angular-vibrator/example).

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

1 - Include the vibrator as a dependency for your app.

```js
angular.module('yourApp', ['angular-vibrator'])
```

2 - Use `vibrator` service as a dependency in your controller

```js
 .controller('VibrationsCtrl', ['$scope', 'vibrator', function($scope, vibrator){

   $scope.vibrate = function(duration) {
     vibrator.vibrate(duration);
   };
 }]);
```

3 - Bind it to the view (optional)

```html
  <body ng-app="VibratorDemo" ng-controller="VibrationsCtrl">
    <!-- some html ... -->
    <input type="text" ng-model="duration">
    <button ng-click="vibrate(duration)">
      Click me (I'll vibrate for {{duration}} ms)
    </button>
    <!-- some html ... -->
  </body>
```

## Configuration

**Choose your own sequences**

By default the sequences are already defined. But if you want to change it/adapt it to your need you can do it easily:

```js
 angular.module('yourApp', ['angular-vibrator'])
   .config(['vibratorProvider', function(vibratorProvider) {
     // Define your own sequences
     var sequences = {
       default: 900,
       twice: [200, 100, 300],
       long: 2500
     };

     vibratorProvider.setSequences(sequences);
  }])
 ```

Checkout the [example](https://github.com/cyrilf/angular-vibrator/tree/master/example) folder for more informations/tips.

## Error Handling

Angular Vibrator includes error handling through broadcast messages sent from the `$rootScope`. This way you can, in your application, easily catch these errors and do whatever you want with it.

Here is how you can implement this:

```js
 angular.module('yourApp', ['angular-vibrator'])
   .controller('VibrationsCtrl', ['$scope', function($scope){

     $scope.$on('vibrator:unsupportedBrowser', function() {
      console.log('Do whatever you want like display a warning on the page');
     });
   }]);
```

## License

  Licensed under the MIT license

[Cyril F - Web developer](http://cyrilf.com)