angular.module('platypus.events', [])

.controller('EventsController', function($scope, $http, $location, Likes, Restaurants, Events){

  // $scope.data = {};

  // $scope.data.likes = {};

  $scope.toggleForm = false;

  $scope.events = [];

  $scope.goToEvent = function (eventId) {
    $location.path('/events/'+ eventId);
  }



  // var updateUserLikes = function() {
  //   Likes.findUserLikes()
  //   .then(function(likes) {
  //     $scope.data.likes = {};
  //     for (var i = 0; i < likes.length; i++) {
  //       $scope.data.likes[likes[i].restaurant] = true;
  //     }
  //   });
  // };

  // updateUserLikes();

  // //get all restaurants from database
  // Restaurants.getAll()
  // .then(function(restaurants) {
  //   $scope.data.restaurants = restaurants;
  //   console.log("retrievingAll: frontend controller");
  //   console.log(restaurants);
  // })
  // .catch(function(error) {
  //   console.error(error);
  // });

  // $scope.feedOrder = '-likes';

  // //update Likes
  // $scope.updateLikes = function(restID) {
  //   Likes.addOrRemove(restID)
  //   .then(function(liked) {
  //     Restaurants.updateLikes(restID)
  //     .then(function(likes) {
  //       var restaurants = $scope.data.restaurants;
  //       for (var i = 0; i < restaurants.length; i++) {
  //         if (restaurants[i]._id === restID) {
  //           restaurants[i].likes = likes;
  //         }
  //       }
  //       updateUserLikes();
  //     });
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
  // };

  $scope.createEvent = function(event) {
    Events.createOne(event)
    .then(function(resp){
      console.log('Event has been created', resp);
      $scope.loadEvents();
      console.log('Sent to Slack!');
      $http({
    method: 'POST',
    url: "https://hooks.slack.com/services/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",
    data: JSON.stringify({"text": "Hey <!channel>, there's a new event! " + " \n " + "Event: "  + resp.data.name + "\n"  + "When: " + new Date(resp.data.date).toGMTString() + "\n" + "Link: http://127.0.0.1:8000/#/events/" + resp.data._id }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    })
    .catch(function(error){
      console.log('error');
    });
  };

 $scope.loadEvents = function() {
  Events.getAll()
    .then(function(events) {
      $scope.events = events;
      console.log($scope.events);
    });
  };
$scope.loadEvents();

   $scope.sendToSlack = function() {

};

 $scope.loadEvents = function() {
  Events.getAll()
    .then(function(events) {
      $scope.events = events;
      console.log($scope.events);
    });
  };
$scope.loadEvents();
});

