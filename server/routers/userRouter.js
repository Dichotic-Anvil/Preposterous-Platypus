var userRouter = require('express').Router();

var userController = require('../users/userController.js');

userRouter.route('/')
               .post(userController.createOne)
               .get(userController.retrieveAll);

userRouter.route('/:id')
               .get(userController.retrieveOne)
               .put(userController.updateOne)
               .delete(userController.removeOne);              

module.exports = userRouter;
