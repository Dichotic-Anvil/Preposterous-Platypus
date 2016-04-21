var Likes = require('./likesModel.js');

module.exports = {
  addOne: function(req, res) {
    // console.log('REQUEST IS >>>>', req);
    // console.log('SESSION DATA >>>', req.session);
    var newLikes = {
      restaurant: req.body.restaurant,
      user: req.session.passport.user
    };
    Likes.create(newLikes, function(err, response) {
      if (err) {
        return res.json(err);
      }
      res.json(response);
    });
  },

  retrieveAll: function(req, res) {
    var query = req.query;
    Likes.find(query, function(err, response) {
      if (err) {
        return res.json(err);
      }
      res.json(response);
    });
  },

  retrieveOne: function(req, res) {
    var query = {_id: req.params.id};
    Likes.findOne(query, function(err, response) {
      if (err) {
        return res.json(err);
      }
      res.json(response);
    });
  },

  removeOne: function(req, res) {
    var query = {_id: req.params.id};
    Likes.findOneAndRemove(query, function(err, response) {
      if (err) {
        return res.json(err);
      }
      res.json(response);
    });
  },

  retrieveLikedRestaurants: function(req, res) {
    var query = { user: req.session.passport.user };
    // var restaurant = { restaurant: req.body.restaurant };
    Likes
    .find(query)
    .populate('restaurant')
    .exec(function(err, restaurants) {
      if (err) {
        return err;
      }
      res.send(restaurants);
    });
  },

  addOrRemove: function(req, res) {
    var query = { 
      restaurant: req.body.restaurant,
      user: req.session.passport.user
       };

    Likes.findOneAndRemove(query, function(err, response) {
      if (err) {
        console.log(res.send(err));
      }
      if (!response) {
        var newLikes = {
          restaurant: req.body.restaurant,
          user: req.session.passport.user
        };
        Likes.create(newLikes, function(err, response) {
          if (err) {
            return res.send(err);
          }
          response = {
            liked: true
          };
          res.send(response);
        });
      } else {
        response = {
          liked: false
        };
        res.send(200, response);
       
      }
    });
  },

  findUserLikes: function(req, res) {
    // console.log('req ', req);
    // console.log('SESSION DATA >>>', req.session);
    console.log('req.session.passport.user ', req.session.passport.user);
    var query = { user: req.session.passport.user };

    Likes.find(query, 'restaurant', function(err, response) {
      if (err) {
        console.log(res.send(err));
      }
      console.log(response);
      res.send(200, response);
    });
  }
};