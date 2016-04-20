var mongoose = require('mongoose');
var relationship = require("mongoose-relationship");

// Flesh out our User schema and register the model with Mongoose

var restaurantSchema = new mongoose.Schema({
  parent: {type: Schema.ObjectId, ref: 'Event', childPath: 'locales'},
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
  likes: Number,
  categories: [{type: String}]
});

restaurantSchema.plugin(relationship, {relationshipPathName: 'parent'});
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;