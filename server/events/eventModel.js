var mongoose = require('mongoose');
var Restaurant = require('../restaurants/restaurantModel.js');
var Schema = mongoose.Schema;


var eventSchema = new Schema(
  {
    name: String,
    time: Date,
    date: Date,
    locales: 
    [
      {
       type: Schema.ObjectId,
       ref: 'Restaurant',
       default: []
      }
    ] 
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
