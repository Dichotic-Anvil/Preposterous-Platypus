var eventsRouter = require('express').Router();

var eventsRouter = require('../events/eventsController.js');

eventsRouter.route('/events')
                .get(eventsRouter.retrieveAll)
                .post(eventsRouter.addOne);

eventsRouter.route('/event/:event_id')
                .get(eventsRouter.retrieveAll)
                .post(eventsRouter.addOne);

module.exports = userRouter;