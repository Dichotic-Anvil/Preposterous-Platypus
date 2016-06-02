angular.module('platypus.event', [])
 .controller('EventController', function($scope, $routeParams, YelpApi, Restaurants, $location, $http, Event){

  var event_id = $routeParams.event_id;
  $scope.eventData = {event: {votes: [] }};

  $scope.votes = {};

  var test = function() {
    var counter = 0;
    for (var i = 0; i < $scope.eventData.event.votes.length; i++) {
      var key = $scope.eventData.event.votes[i].restaurant._id;
      $scope.votes[key] = $scope.eventData.event.votes[i].voters.length;
    }
  };



  $scope.addToEvent = function () {
    $location.path('/addtoevent/'+ event_id);
  }

  Event.getOne(event_id)
    .then(function(event) {
      $scope.eventData.event = event;
      test();

      var arrayOfRestaurants = $scope.eventData.event.options;
      for (var i = 0, len = arrayOfRestaurants.length; i < len; i++) {
        var restaurant = arrayOfRestaurants[i];
        var restaurantId = restaurant._id;
        restaurant.numVotes = restaurant.numVotes || 0;
      }

    })
    .catch(function(err) {
      console.error(err);
    });

  $scope.vote = function(restaurant, restaurantId){
    restaurant.numVotes++

    Restaurants.updateVotes(restaurantId, restaurant.numVotes)
    .then(function(vote){
      console.log('Vote successfully stored', vote)
    })
    .catch(function(err){
      console.error(err);
    })
};

  $scope.data = {};
  $scope.loading = false;

  $scope.search = function(){
    $scope.data.restaurants = {};
    $scope.data.currentRestaurants = {};
    $scope.loading = true;

    YelpApi.retrieveYelp($scope.name, function(restaurants){
      // Find currently tracked restaurants
      Restaurants.retrieveYelpIDs(function(resp) {
        for(var i = 0; i < resp.length; i++) {
          $scope.data.currentRestaurants[resp[i].yelpID] = true;
        }
        $scope.loading = false;
        $scope.data.restaurants = restaurants;
        $scope.name = '';
      });
    });
  };

 });
