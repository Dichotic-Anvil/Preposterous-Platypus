angular.module('platypus.event', [])
 .controller('EventController', function($scope, $routeParams, YelpApi, Restaurants, $location, $http, Event){

  var event_id = $routeParams.event_id;
  $scope.eventData = {};


  $scope.addToEvent = function () {
    $location.path('/addtoevent/'+ event_id);
  }

  Event.getOne(event_id)
    .then(function(event) {
      $scope.eventData.event = event;
      console.log("Retrieved event successfully", event);
      })
    .catch(function(err) {
      console.error(err);
    });



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

  $scope.retrieveAll = function(){

  }

  // $scope.addOne = function(restaurant){
  //   // var restaurantCategories = [];

  //   // // Categories Have extra information that has to be sanitized 
  //   // for(var i = 0; i < restaurant.categories.length; i++) {
  //   //   restaurantCategories.push(restaurant.categories[i][0]);
  //   //}

  //   EventBiz.addOne({
  //     name: restaurant.name,
  //     yelpID: restaurant.id,
  //     eat24_url: restaurant.eat24_url || null,
  //     image_url: restaurant.image_url,
  //     upvote: 0,
  //     // categories: restaurantCategories
  //   }, function(resp) {
  //      var id = {restaurant: resp.data._id};
  //     $location.path('/events/' + event_id);
  //       // Likes.addOne(id, function(resp) {
  //       //   Restaurants.updateLikes(id.restaurant) 
  //       //   .then(function(resp){
  //       //     console.log('Response to like update', resp);
  //       //   });
  //       // });
  //   });
  // }

 });
