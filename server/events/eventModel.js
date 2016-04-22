var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');


var eventSchema = new Schema(
  {
    name: String,
    date: Date,
    options: 
    [
      {
       type: Schema.ObjectId,
       ref: 'Restaurant',
       default: []
      }
    ],
    votes: [
      {
        restaurant: {
          type: Schema.ObjectId,
          ref: 'Restaurant',
        },
        voters: [
          {
            type: Schema.ObjectId,
            ref: 'User',
            default: []
          }
        ]
      }
    ],
});

eventSchema.pre('save', function(next){
  next();
})
var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
