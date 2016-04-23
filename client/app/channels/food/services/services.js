angular.module('platypus.foodServices', [])

.factory('YelpApi', ['$http',
      function ($http) {
        var randomString = function (length, chars) {
          var result = '';
          for (var i = length; i > 0; --i) {
            result += chars[Math.round(Math.random() * (chars.length - 1))];
          }
          return result;
        };

        var retrieveYelp = function (name, callback) {
          var method =  'GET';
          var url =     'http://api.yelp.com/v2/search';
          var params = {
            callback:                 'angular.callbacks._0',
            ll:                       '37.7836963,-122.4096779',
            radius_filter:            '3219',
            oauth_consumer_key:       'y4tg_eBNrW8nZpjzBV_KSg', // consumer key
            oauth_token:              'j3UjqD4i0QMmH2CtuK9uANsL37cAV9RA', //Token
            oauth_signature_method:   'HMAC-SHA1',
            oauth_timestamp:          new Date().getTime(),
            oauth_nonce:              randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
            term:                     name || 'food', 
            actionlinks:              true
          }; // end params
          var consumerSecret =        '2EnxjssNE3xdpLR-D2PuFXPodw4'; //Consumer Secret
          var tokenSecret =           'POtaty6CyAsQBHvcSJWLmdv1BHo'; //Token Secret
          var signature = 
            oauthSignature.generate(
              method, 
              url, 
              params, 
              consumerSecret, 
              tokenSecret, 
              { encodeSignature: false }
            ); 
            // end signature
          params['oauth_signature'] = signature;
          console.log('inside yelpapi factory');
          console.log('Term searched for: ' + params.term);
          $http.jsonp(url, { params : params })
            .then(callback, function(err) {
              console.log('An error occured: ', err);
            });
            console.log("inside end of yelpapi factory");
        }; // end retrieveYelp

        return {
          retrieveYelp: retrieveYelp      
        };

      } // end function

    ]) // end factory

.factory('Restaurants', function ($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/restaurants',
    })
    .then(function(resp) {
      console.log('GET request was successful!');
      return resp.data;
    });
  };

  var retrieveYelpIDs = function(callback) {
    return $http({
      method: 'GET',
      url: '/api/restaurants/yelpIDs',
    })
    .then(function(resp) {
      callback(resp.data);
    });
  };

  var addOne = function(data, callback) {
    return $http({
      method: 'POST',
      url: '/api/restaurants',    
      data: data
    })
    .then(function(resp) {
      callback(resp);
    });
  };

  var removeOne = function(data) {
    return $http({
      method: 'DELETE',
      url: '/api/restaurants',    
      data: data
    })
    .then(function(resp) {
      console.log('DELETE request was successful!');
      return resp;
    });
  };

  var updateLikes = function(data) {
    return $http({
      method: 'PUT',
      url: '/api/restaurants',    
      data: {
        restaurant: data
      }
    })
    .then(function(resp) {
      console.log('updateLikes - PUT request was successful!');
      return resp.data;
    });
  };

  var updateVotes = function(restaurantId, data) {
    return $http({
      method: 'PUT',
      url: '/api/restaurants/' + restaurantId,    
      data: { numVotes: data }
    })
    .then(function(resp) {
      console.log('Updated Votes - PUT request was successful!');
      return resp.data;
    });
  };

  return {
    getAll: getAll,
    addOne: addOne,
    removeOne: removeOne,
    updateLikes: updateLikes,
    retrieveYelpIDs: retrieveYelpIDs,
    updateVotes: updateVotes
  };
})

.factory('Users', function ($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/users',
    })
    .then(function(resp) {
      console.log('GET request was successful!');
      return resp.data;
    });
  };

  var createOne = function(data) {
    return $http({
      method: 'POST',
      url: '/api/users',    
      data: data
    })
    .then(function(resp) {
      console.log('POST request was successful!');
      return resp;
    });
  };
  return {
    getAll: getAll,
    createOne: createOne
  };
})

.factory('Likes', function ($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/likes',
    })
    .then(function(resp) {
      console.log('GET request was successful!');
      return resp.data;
    });
  };

//join create may need to be reimplemented
  var addOne = function(data, callback) {
    return $http({
      method: 'POST',
      url: '/api/likes',    
      data: data
    })
    .then(function(resp) {
      callback(resp);
    });
  };

  var removeOne = function(data) {
    return $http({
      method: 'DELETE',
      url: '/api/likes',    
      data: data
    })
    .then(function(resp) {
      console.log('POST request was successful!');
      return resp;
    });
  };

  var retrieveLikedRestaurants = function(callback) {
    return $http({
      method: 'GET',
      url: '/api/likes',
    })
    .then(function(resp) {
      console.log('GET request was successful - all Liked Restaurants retrieved.');
      // console.log(resp.data);
      callback(resp.data);
    });
  };

  var addOrRemove = function(dataID) {
    return $http({
      method: 'POST',
      url: '/api/likes/addOrRemove',
      data: {
        restaurant: dataID
      }
    })
    .then(function(resp) {
      console.log('POST was successful - addOrRemove');
      return resp.data;
    });
  };

  var findUserLikes = function() {
    return $http({
      method: 'GET',
      url: '/api/likes/user',
    })
    .then(function(resp) {
      // console.log('GET was successful - findUserLikes');
      return resp.data;
    });
  };

  return {
    getAll: getAll,
    addOne: addOne,
    removeOne: removeOne,
    retrieveLikedRestaurants: retrieveLikedRestaurants,
    addOrRemove: addOrRemove,
    findUserLikes: findUserLikes
  };
})
.factory('Events', function ($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/events',
    })
    .then(function(resp) {
      console.log('GET request was successful!');
      return resp.data;
    });
  };

  var createOne = function(data) {
    return $http({
      method: 'POST',
      url: '/api/events',    
      data: data
    })
    .then(function(resp) {
      console.log('POST request was successful!');
      return resp;
    });
  };
  return {
    getAll: getAll,
    createOne: createOne
  };
})

.factory('Event', function ($http) {

  var getOne = function (event_id) {
    return $http({
      method: 'GET',
      url: '/api/events/' + event_id,
    })
    .then(function(resp) {
      // console.log("THIS IS THE DATA", resp.data);
      // console.log("THIS IS THE NAME OF THE EVENT", resp.data.name);
      // console.log("THESE ARE THE VOTES", resp.data.votes[0]);
      // console.log("THESE ARE THE AMOUNT OF VOTERS", resp.data.votes[0].voters.length);
      // console.log("THESE ARE THE VOTERS", resp.data.votes[0].voters[0].name)
      // console.log("THIS IS THE DATA", resp.data);
      // console.log('GET request was successful!');
      return resp.data;
    })
  };

  var addOneRestaurant = function(data, event_id) {
    console.log('WE THINK THERE IS SOMETHING HERE', data);
    return $http({
      method: 'POST',
      url: '/api/events/' + event_id + '/add_restaurant',    
      data: {restaurantId: data}
    })
    .then(function(resp) {
      console.log('POST request was successful!');
      return resp;
    });
  };

  return {
    getOne: getOne,
    addOneRestaurant: addOneRestaurant
  };
  
})