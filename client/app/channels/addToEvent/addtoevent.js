angular.module('platypus.addToEvent', [])
 .controller('AddToEventController', function($scope, $routeParams, YelpApi, Restaurants, $location, Event, Likes){

   var event_id = $routeParams.event_id;
   console.log(event_id);


// Modify this file to pull yelp data and map to Event but not user.
$scope.addOne = function(restaurant){
  console.log('WHAT THE FUCK ARE YOU!!!!!!!!!!!!', restaurant)
  Event.addOneRestaurant(restaurant.restaurant._id, event_id)
    .then(function(response) {
      console.log("RESPONSE YOYOYOYOYOYOYOYOYOYOYO", response);
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

//////////////////////////////
  // $scope.data = {};
  // $scope.loading = false;

  // $scope.search = function(){
  //   $scope.data.restaurants = {};
  //   $scope.data.currentRestaurants = {};
  //   $scope.loading = true;

  //   YelpApi.retrieveYelp($scope.name, function(restaurants){
  //     // Find currently tracked restaurants
  //     Restaurants.retrieveYelpIDs(function(resp) {
  //       for(var i = 0; i < resp.length; i++) {
  //         $scope.data.currentRestaurants[resp[i].yelpID] = true;
  //       }
  //       $scope.loading = false;
  //       $scope.data.restaurants = restaurants;
  //       $scope.name = '';
  //     });
  //   });
  // };
////////////////////////
  
    // var restaurantCategories = [];

    // // Categories Have extra information that has to be sanitized 
    // for(var i = 0; i < restaurant.categories.length; i++) {
    //   restaurantCategories.push(restaurant.categories[i][0]);
    //}

    // EventBiz.addOne({
    //   name: restaurant.name,
    //   yelpID: restaurant.id,
    //   eat24_url: restaurant.eat24_url || null,
    //   image_url: restaurant.image_url,
    //   upvote: 0,
    //   // categories: restaurantCategories
    // }, function(resp) {
    //    var id = {restaurant: resp.data._id};
    //   $location.path('/events/' + event_id);
    //     // Likes.addOne(id, function(resp) {
    //     //   Restaurants.updateLikes(id.restaurant) 
    //     //   .then(function(resp){
    //     //     console.log('Response to like update', resp);
    //     //   });
    //     // });
    // });

 });
