// Define the `phonecatApp` module
var codenameApp = angular.module('codenameApp', []);

// Define the `GameController` controller on the `phonecatApp` module
codenameApp.controller('GameController', function GameController($scope, $http, $interval) {
  $scope.words = [];
  $scope.mastermind = false;
  $scope.spy = false;
  
  $scope.refresh = function(newGame){
	  $http({
      method: 'GET',
      url: 'https://l7plker6t7.execute-api.ap-southeast-2.amazonaws.com/prod/getwords'
	  }).then(function successCallback(response) {
      if (newGame || $scope.words.length === 0) {
        $scope.words = response.data
        return
      }
      let newWords = []
      for (let i = 0; i < response.data.length; i++) {
        if (!response.data[i].revealed && $scope.words[i].revealed) {
          response.data[i].revealed = true
        }
        newWords.push(response.data[i])
      }
      $scope.words = newWords
	  }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
	  });
  };
  
  $scope.newGame = function() {
    $http({
      method: 'GET',
      url: 'https://l7plker6t7.execute-api.ap-southeast-2.amazonaws.com/prod/newgame'
	  }).then(function successCallback(response) {
      $scope.refresh(true);
	  }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
	  });
  };

  $scope.showWord = function(i) {
    $scope.words[i].revealed = true;
    $http({
      method: 'GET',
      url: 'https://l7plker6t7.execute-api.ap-southeast-2.amazonaws.com/prod/revealcard?id=' + i
	  }).then(function successCallback(response) {
      
	  }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
	  });
  };
  
  $scope.amMastermind = function(){
    $scope.mastermind = true;
  };
  
  $scope.amSpy = function(){
    $scope.spy = true;    
  };
  
  $scope.refresh();
  $interval(function() {
      $scope.refresh();
    }, 5000);

  
});