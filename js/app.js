'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['ui.bootstrap','myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'TimeCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
