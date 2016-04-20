var eventRouter = require('express').Router();

var eventController = require('../events/eventController.js');

eventRouter.route('/events')
                .get(eventController.retrieveAll)
                .post(eventController.addOne);

eventRouter.route('/event/:event_id')
                .get(eventController.retrieveAll)
                .post(eventController.addOne);

module.exports = userRouter;
