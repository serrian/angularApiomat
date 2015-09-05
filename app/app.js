'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])
.controller('NavBarController', ['$scope','$rootScope', 'UserService', function($scope, $rootScope, UserService){
  $scope.userName = 'not logged-in';
  $rootScope.$on('user', function(event, data){
    $scope.$apply(function (){
      $scope.userName = data.data.userName;
    })
  });
}])
.factory('UserService', ['$rootScope', function($rootScope){

  var user = new Apiomat.User();

  return {
    newUser: function(userName, password){
      user.setUserName(userName);
      user.setPassword(password);
      Apiomat.Datastore.configureWithCredentials(user);
      user.save({
        onOk: function() {

          console.log("Saved user successfully, name: " + user.getUserName());
        },
        onError: function(error) {
          console.log("Some error occured. "+ error.statusCode + " --> " + error.message);
        }
      })
    },
    logIn: function(userName, password){
      //testUser for testing purposes
      user.setUserName("testUser123");
      user.setPassword("testtest");
      // user.setUserName(userName);
      // user.setPassword(password);
      Apiomat.Datastore.configureWithCredentials(user);
      user.loadMe({
        onOk: function() {
           //Successfully logged in.
           $rootScope.$broadcast('user', user);
           console.log("Login successfull", user.getFirstName());
         },
         onError: function(error) {
           //do error handling
           console.log("Login failed, error: ", error.message);
         }
      });
    },
    getCurrentUser: function(){
      if (Apiomat.Datastore.isInstantiated() === false){
        console.log("No Datastore instantiated, please login first");
      }
      else{
        return user;
      }
    }
  }
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
