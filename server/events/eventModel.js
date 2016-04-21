var mongoose = require('mongoose');
var EventBiz = require('../event_business/event_businessModel.js');
var Schema = mongoose.Schema;


var eventSchema = new Schema(
  {
    name: String,
    time: Date,
    date: Date,
    eventBiz: 
    [
      {
       type: Schema.ObjectId,
       ref: 'EventBiz',
       default: []
      }
    ] 
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
