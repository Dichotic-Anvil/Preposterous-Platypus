var restaurantController = require('../restaurants/restaurantController.js');
var userController = require('../users/userController.js');

// Specialized Routers
var restaurantRouter = require('../routers/restaurantRouter.js');
var userRouter = require('../routers/userRouter.js');
var likesRouter = require('../routers/likesRouter.js');
var eventRouter = require('../routers/eventRouter.js');
// var event_upvotesRouter = require('../routers/event_upvotesRouter.js');


module.exports = function (app, express, passport) {
  var isAuth = function(req, res, next) {
    req.isAuthenticated() ? next() : res.status(403).send('Error: not authorized.');
  };

  //API endpoints for signIn, signUp, and checkAuth
  app.get('/api/users/signedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : false);
  });

  app.get('/github/auth', passport.authenticate('github', { successRedirect: '/#/user/dashboard', failureRedirect: '/'}));
  app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/'}),
  	function(req, res) {
  	  var tempPassportSession = req.session.passport;
  	  req.session.regenerate(function() {
  	  	req.session.passport = tempPassportSession;
  	  	res.redirect('/#/user/dashboard');
  	  });
  	});

  app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });

  // API endpoints for non-
  app.use('/api/restaurants', isAuth, restaurantRouter);
  app.use('/api/users', isAuth, userRouter);
  app.use('/api/likes', isAuth, likesRouter);
  app.use('/api/events', eventRouter);
  // app.use('/api/event_upvotes', isAuth, event_upvotesRouter);
};
