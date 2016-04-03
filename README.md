
 - uses ngRoute for client-side routing.
 - Login / Logout via Angular Service ($q promise style)
```
CLIENTSIDE
/*----------*/
/* LOGIN PROCESS   */
/*----------*/
    AuthService.login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }


angular.module('myApp').controller('loginController',['$scope', '$location', 'AuthService',function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.login = function () {

      // initial values
      $scope.error = false;         //hide error bar
      $scope.disabled = true;       //disable Login button to prevent double send

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)//<-----------PROCESS DONE BY SERVICES
        // handle success
        .then(function () {
          $location.path('/');      //redirect to home
          $scope.disabled = false;  //reenable Login button
          $scope.loginForm = {};    //clear input fields
        })
        // handle error
        .catch(function () {
          $scope.error = true;      //show error bar
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;  //reenable Login button
          $scope.loginForm = {};    //clear input fields
        });

SERVERSIDE

== app.js (main server file) ==
var routes = require('./routes/api.js');
app.use('/user/', routes);

== ./routes/api.js' ==

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    userjs = require('../models/user.js');
...

/*----------*/
/* LOGIN USER  */
/*----------*/
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log("login " + user.username)
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

```



 - No User Accounts, only user = true/ user = false, can convert to accounts with some templating work.

BUGS

Due to how things are routed. you can skip ahead to "/" without logging in.
