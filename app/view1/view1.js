'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'UserService', function($scope, UserService) {
  var self = this;
  self.test = 'test123';
  var user = UserService.getCurrentUser();
  if (user){
    $scope.user.firstName = user.getFirstName();
  }
  $scope.submit = function(){
    var name = $scope.user.name;
    var pw = $scope.user.password;
    UserService.newUser(name,pw);
  };
  $scope.login = function(){
    UserService.logIn();
  }
}]);
