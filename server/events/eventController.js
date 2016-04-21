var Event = require('./eventModel.js');

module.exports = {
  // 
  addOne: function(req, res) {
    var newEvent = req.body;
    console.log(newEvent);
    Event.create(newEvent, function(err, data) {
      if (err) {
        return res.json(err);
      }
      res.json(data);
    });
  },
  retrieveOne: function(req, res) {
    var query = { _id: req.params.id };
    Event.findOne(query)
    .populate('locales')
    .exec(function(err, data) {
      if (err) {
        return res.json(err);
      }
      res.json(data);
    });
  },
  retrieveAll: function(req, res) {
    var query = req.query;
    Event.find({}, function(err, data) {
      if (err) {
        return res.json(err);
      }
      res.json(data);
    });
  }
};
