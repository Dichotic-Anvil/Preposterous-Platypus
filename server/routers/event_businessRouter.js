var event_businessRouter = require('express').Router();

var event_businessController = require('../event_business/event_businessController.js');

event_businessRouter.route('/')
               .post(event_businessController.addOne)
               .get(event_businessController.retrieveAll)
               .put(event_businessController.updateLikes);

event_businessRouter.route('/yelpIDs')
               .get(event_businessController.retrieveYelpIDs);

event_businessRouter.route('/:id')
               .get(event_businessController.retrieveOne)
               .put(event_businessController.updateOne)
               .delete(event_businessController.removeOne);              

module.exports = event_businessRouter;
