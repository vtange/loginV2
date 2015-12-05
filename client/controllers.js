angular.module('myApp').controller('loginController',['$scope', '$location', 'AuthService',function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;       //disable Login button to prevent double send

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');      //redirect to home
          $scope.disabled = false;  //reenable Login button
          $scope.loginForm = {};    //clear input fields
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;  //reenable Login button
          $scope.loginForm = {};    //clear input fields
        });

    };

}]);

angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      console.log(AuthService.getUserStatus());

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login'); //back to Login page
        });

    };

}]);

angular.module('myApp').controller('registerController',['$scope', '$location', 'AuthService',function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;          //disable Login button to prevent double send

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');    // to Login page
          $scope.disabled = false;     //reenable Login button
          $scope.registerForm = {};    //clear input fields
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;     //reenable Login button
          $scope.registerForm = {};    //clear input fields
        });

    };

}]);
