angular.module('platypus.events', [])

.controller('EventsController', function($scope, $http, $location, Likes, Restaurants, Events){

  $scope.toggleForm = false;

  $scope.events = [];

  $scope.goToEvent = function (eventId) {
    $location.path('/events/'+ eventId);
  }

  $scope.createEvent = function(event) {
    Events.createOne(event)
    .then(function(resp){
      console.log('Event has been created', resp);
      $scope.loadEvents();
      $http({
        method: 'POST',
        url: "https://hooks.slack.com/services/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",
        data: JSON.stringify({"text": "Hey <!channel>, there's a new event! " + " \n " + "Event: "  + resp.data.name + "\n"  + "When: " + new Date(resp.data.date).toLocaleString()  + "\n" + "Link: http://127.0.0.1:8000/#/events/" + resp.data._id }),
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
    });
  };

  $scope.loadEvents();
     $scope.sendToSlack = function() {
  };

  $scope.loadEvents = function() {
    Events.getAll()
    .then(function(events) {
      $scope.events = events;
    });
  };

  $scope.loadEvents();

});

