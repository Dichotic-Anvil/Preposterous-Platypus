angular.module('platypus.addToEvent', [])
 .controller('AddToEventController', function($scope, $routeParams, YelpApi, Restaurants, $location, Event, Likes){

   var event_id = $routeParams.event_id;

    $scope.addOne = function(restaurant){
      Event.addOneRestaurant(restaurant.restaurant._id, event_id)
        .then(function(response) {
          console.log('response', response)
        })
        .catch(function(err) {
          console.error("err", err);
        });
    };

    $scope.data = {};

    $scope.populate = function() {
      Likes.retrieveLikedRestaurants(function(restaurants) {
        $scope.data.restaurants = [];
        $scope.data.restaurants = restaurants;
        console.log('RESTAURANTS: ', restaurants);
      });
    };

    $scope.populate();
  });
