angular.module('platypus.events', ['platypus.services'])

.controller('EventsController', function($scope, Likes, Restaurants, Events){

  $scope.data = {};

  $scope.data.likes = {};

  $scope.toggleForm = true;

  var updateUserLikes = function() {
    Likes.findUserLikes()
    .then(function(likes) {
      $scope.data.likes = {};
      for (var i = 0; i < likes.length; i++) {
        $scope.data.likes[likes[i].restaurant] = true;
      }
    });
  };

  updateUserLikes();

  //get all restaurants from database
  Restaurants.getAll()
  .then(function(restaurants) {
    $scope.data.restaurants = restaurants;
    console.log("retrievingAll: frontend controller");
    console.log(restaurants);
  })
  .catch(function(error) {
    console.error(error);
  });

  $scope.feedOrder = '-likes';

  //update Likes
  $scope.updateLikes = function(restID) {
    Likes.addOrRemove(restID)
    .then(function(liked) {
      Restaurants.updateLikes(restID)
      .then(function(likes) {
        var restaurants = $scope.data.restaurants;
        for (var i = 0; i < restaurants.length; i++) {
          if (restaurants[i]._id === restID) {
            restaurants[i].likes = likes;
          }
        }
        updateUserLikes();
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  $scope.createEvent = function (event) {
    Events.createOne(event)
    .then(function(resp){
      console.log('Event has been created', resp);
    })
    .catch(function(error){
      console.log('error');
    })
  };
});






