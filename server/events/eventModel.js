var mongoose = require('mongoose');
var Restaurant = require('../restaurants/restaurantModel.js');
var Schema = mongoose.Schema;


var eventSchema = new Schema({
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
     type: Schema.ObjectId,
     ref: 'Restaurant',
     default: []
    }
  ] 
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
