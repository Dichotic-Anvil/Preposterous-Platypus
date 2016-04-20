var mongoose = require('mongoose');

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
  }
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Events;