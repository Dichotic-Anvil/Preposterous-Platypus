var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var Event = require('../events/eventModel.js')

// Flesh out our User schema and register the model with Mongoose

var eventBizSchema = new Schema({
  parent: {type: Schema.ObjectId, ref: 'Event', childPath: 'eventBiz'},
  name: {
    type: String,
    unique: true,
    required: true
  },
  yelpID: String,
  url: {
    type: String
  },
  eat24_url: {
    type: String,
    required: false
  },
  image_url: String,
  upvotes: Number,
  categories: [{type: String}]
});

eventBizSchema.plugin(relationship, {relationshipPathName: 'parent'});
var EventBiz = mongoose.model('EventBiz', eventBizSchema);

module.exports = EventBiz;