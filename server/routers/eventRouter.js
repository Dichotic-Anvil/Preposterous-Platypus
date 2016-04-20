var eventRouter = require('express').Router();

var eventRouter = require('../events/eventController.js');

eventRouter.route('/events')
                .get(eventRouter.retrieveAll)
                .post(eventRouter.addOne);

eventRouter.route('/event/:event_id')
                .get(eventRouter.retrieveAll)
                .post(eventRouter.addOne);

module.exports = userRouter;