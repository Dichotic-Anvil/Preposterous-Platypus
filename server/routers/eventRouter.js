var eventRouter = require('express').Router();

var eventController = require('../events/eventController.js');

eventRouter.route('/')
                .get(eventController.retrieveAll)
                .post(eventController.addOne);

eventRouter.route('/:id')
                .get(eventController.retrieveOne)
                .put(eventController.updateOne);

eventRouter.route('/:id/add_restaurant')
                .post(eventController.addRestaurant);

eventRouter.route('/:id/vote')
                .post(eventController.vote);

module.exports = eventRouter;
