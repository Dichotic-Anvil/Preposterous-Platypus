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
      // console.log('added to votes');
      // $scope.votes.push(++counter);


      // $scope.votes.push({ $scope.eventData.event.votes[i].restaurant._id : $scope.eventData.event.votes[i].voters.length });
    }
    console.log('votes');
    console.log($scope.votes);
  };



  $scope.addToEvent = function () {
    $location.path('/addtoevent/'+ event_id);
  }

  Event.getOne(event_id)
    .then(function(event) {
      $scope.eventData.event = event;
      console.log("Retrieved event successfully", event);
      test();

      var arrayOfRestaurants = $scope.eventData.event.options;
      for (var i = 0, len = arrayOfRestaurants.length; i < len; i++) {
        var restaurant = arrayOfRestaurants[i];
        var restaurantId = restaurant._id;
        restaurant.numVotes = restaurant.numVotes || 0;
      }
      console.log('LOOKIEE HERE');
      console.log(arrayOfRestaurants);


      })
    .catch(function(err) {
      console.error(err);
    });

  $scope.vote = function(restaurant, restaurantId){
    restaurant.numVotes++
    //SERVER SIDE CODE HERE

    Restaurants.updateVotes(restaurantId, restaurant.numVotes)
    .then(function(vote){
      console.log('Vote successfully stored', vote)
    })
    .catch(function(err){
      console.error(err);
    })

    //send a put request to api/events/event_id/vote

  // Event.vote(restaurant._id, event_id)
  //   .then(function(response) {
  //     console.log("You placed a vote!", response);
  //   })
  //   .catch(function(err) {
  //     console.error("err", err);
  //   });
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
