var mongoose = require('mongoose');
var Restaurant = require('../restaurants/restaurantModel.js');

var eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  locales: [
    {
     type: Schema.ObjectID,
     ref: 'Restaurant',
     default: []
    }
  ] 
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;