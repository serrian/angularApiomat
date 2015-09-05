var services = angular.module('services', ['ngResource']);

services.factory('UserService', [function() {
  var user = 'Hans';
  return {
    user: function(){
      return user;
    }
  };
}])
