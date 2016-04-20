var restaurantRouter = require('express').Router();

var restaurantController = require('../restaurants/restaurantController.js');

restaurantRouter.route('/')
               .post(restaurantController.addOne)
               .get(restaurantController.retrieveAll)
               .put(restaurantController.updateLikes);

restaurantRouter.route('/yelpIDs')
               .get(restaurantController.retrieveYelpIDs);

restaurantRouter.route('/:id')
               .get(restaurantController.retrieveOne)
               .put(restaurantController.updateOne)
               .delete(restaurantController.removeOne);              

module.exports = restaurantRouter;
