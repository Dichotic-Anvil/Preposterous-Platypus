var EventBiz = require('../event_business/event_businessModel.js');
module.exports = {
  //all methods - find, findOne, addOne, delete, deleteOne
  addOne: function(req, res) {
    var newEventBiz = req.body;
    EventBiz.create(newEventBiz, function(err, data) {
      if (err) {
        return res.json(err);
      }
      res.json(data);
    });
  },

  retrieveYelpIDs: function(req, res) {
    EventBiz.find({}, 'yelpID', function(err, data) {
      if (err) {
        return res.json(err);
      }
      res.json(data);
    });
  },

  updateOne: function(req, res) {
    var query = { _id: req.params.id };
    var updatedProps = req.body;
    var options = {
      new: true,
      upsert: true
    };
    EventBiz.findOneAndUpdate(query, updatedProps, options, function(err, data) {
      if (err) {
        return res.json(err);
      }
      res.json(data);
    });
  },

  updateLikes: function(req, res) {
    var query = { _id: req.body.restaurant };
    //reference for count http://mongoosejs.com/docs/api.html
    Likes.count({restaurant: req.body.restaurant}, function(err, data){
      if(err){
        return res.json(err);
      }
      var updatedProps = { likes: data };
      var options = {
        new: true,
        upsert: true
      };
      Restaurant.findOneAndUpdate(query, updatedProps, options, function(err, data) {
        if (err) {
          return res.json(err);
        }
        console.log('data.likes ', data.likes);
        res.send(200, data.likes);
      });    
    });
  },

  removeOne: function(req, res) {
    var query = { _id: req.params.id };
    EventBiz.findOneAndRemove(query, function(err, data) {
      if (err) {
        return res.json(err);
      }
      res.json(data);
    });
  },

  retrieveOne: function(req, res) {
    var query = { _id: req.params.id };
    EventBiz.findOne(query, function(err, data) {
      if (err) {
        return res.json(err);
      }
      res.json(data);
    });
  },

  retrieveAll: function(req, res) {
    var query = req.query;
    console.log("retrievingAll: backend controller");
    EventBiz.find({}, function(err, data) {
      if (err) {
        return res.json(err);
      }
      res.json(data);
    });
  }
};