var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {        //Determine what page to be shown and what controller
  $routeProvider
    .when('/', {templateUrl: 'partials/home.html', access: {restricted: true}})
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .otherwise({redirectTo: '/login'});
});
