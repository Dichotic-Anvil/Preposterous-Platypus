var eventRouter = require('express').Router();

var eventController = require('../events/eventController.js');

eventRouter.route('/')
                .get(eventController.retrieveAll)
                .post(eventController.addOne);

eventRouter.route('/:id')
                .get(eventController.retrieveOne)
                .post(eventController.addOne);

module.exports = eventRouter;
