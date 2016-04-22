var Event = require('./eventModel.js');
var Restaurant = require('../restaurants/restaurantModel.js');

module.exports = {

  // create new event
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

  // get single event
  retrieveOne: function(req, res) {
    var query = { _id: req.params.id };
    Event.findOne(query)
    .populate('options')
    .populate('votes.restaurant')
    .populate('votes.voters')
    .exec(function(err, data) {
      if (err) {
        return res.json(err);
      }

      console.log()

      res.json(data);
    });
  },

  // POST to add a restaurant to this event
  addRestaurant: function(req, res) {

    var eventId = req.params.id;
    var restaurantId = req.body.restaurantId;


    // verify event exists first
    Event.findOne({_id: eventId})
    .populate('options')
    .exec(function(err, eventDocument){

      if (err){
        return res.json(err);
      }

      if(!eventDocument)
      {
        return res.json({error:true, message: 'Event does not exist'});
      }

      // verify the restaurant exists as well
      Restaurant.findOne({_id: restaurantId})
      .exec(function(err, restaurantDocument) {

          if (err){
            return res.json(err);
          }

          if(!restaurantDocument){
            return res.json({error:true, message: 'Restaurant does not exist'});
          }


          var yelpUniqueId = restaurantDocument['yelpID'];

          // make sure we don't already have this event in options
          var flag = false;
          for(var i = 0; i < eventDocument.options.length; i++)
          {
            if(eventDocument.options[i].yelpID === yelpUniqueId)
            {
              flag = true;
              break;
            }
          }
          if(flag)
          {
             return res.json({error:true, message: 'Restaurant already exists on this event'});
          }

          // finally push on the new option and vote object
          eventDocument.options.push(restaurantDocument._id);

          eventDocument.votes.push({
            restaurant: restaurantDocument._id,
            voters: []
          });

          eventDocument.save(function(err){

              res.json({success: true, message: 'Successfully added restaurant option'});
          });

          

        });

    });

  },

   // POST to VOTE to go to a particular restaurant
  vote: function(req, res) {

    var eventId = req.params.id;
    var restaurantId = req.body.restaurantId;


    // verify event exists first
    Event.findOne({_id: eventId})
    .populate('options')
    .populate('votes.restaurant')
    .exec(function(err, eventDocument){

      if (err){
        return res.json(err);
      }

      if(!eventDocument)
      {
        return res.json({error:true, message: 'Event does not exist'});
      }


      // verify the restaurant exists as well
      Restaurant.findOne({_id: restaurantId})
      .exec(function(err, restaurantDocument) {

          if (err){
            return res.json(err);
          }

          if(!restaurantDocument){
            return res.json({error:true, message: 'Restaurant does not exist'});
          }


          var yelpUniqueId = restaurantDocument['yelpID'];

          // make sure we have this restaurant as an option/votes object
          var subVoteDocumentIndex = -1;
          for(var i = 0; i < eventDocument.votes.length; i++)
          {
            if(eventDocument.votes[i].restaurant.yelpID === yelpUniqueId)
            {
              subVoteDocumentIndex = i;
              break;
            }
          }
          if(subVoteDocumentIndex === -1)
          {
             return res.json({error:true, message: 'Restaurant is not part of this event'});
          }


          var voteSubDocument = eventDocument.votes[subVoteDocumentIndex];

          
          // check if this user has already voted on another restaurant in this event
          var currentUser = '';
          try
          {
              currentUser = req.session.passport.user;
          }
          catch(err)
          {
              // my debugging user id
              currentUser = '571971fbcedd3c44deb6217b';
          }

          var alreadyVotedArr = [];
          for(var i = 0; i < eventDocument.votes.length; i++)
          {
            for(var j = 0; j < eventDocument.votes[i].voters.length; j++)
            {
              if(eventDocument.votes[i].voters[j].toString() == currentUser.toString())
              {
                alreadyVotedArr = [i, j];
                break;
              }
            }
            if(alreadyVotedArr.length > 0)
              break;
          }

          // remove it from the child
          if(alreadyVotedArr.length > 0)
          {
              eventDocument.votes[alreadyVotedArr[0]].voters.splice(alreadyVotedArr[1], 1);
          }

  
          // finally add me as a voter on this restaurant
          eventDocument.votes[subVoteDocumentIndex].voters.push(currentUser);

          eventDocument.save(function(err)
          {
            return res.json({success:true, message: 'successfully voted on restaurant in event'});
          });
      

        });

    });

  },


  retrieveAll: function(req, res) {
    Event.find()
    .populate('options')
    .populate('votes.restaurant')
    .populate('votes.voters')
    .exec(function(err, data) {
      if (err) {
        return res.json(err);
      }

      console.log(data);

      res.json(data);
    });
  },

  updateOne: function(req, res) {
    var query = { _id: req.params.id };
    var updatedProps = req.body;
    var options = {new: true, upsert: true};
    Event.findOneAndUpdate(query, updatedProps, options, function(err, data) {
      if (err) {
        return res.json(err);
      }
      res.json(data);
    });
  },
};
