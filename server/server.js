var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');

var app = express();

var port = process.env.PORT || 8000;
//connect to mongo database named "platypus"
mongoose.connect('mongodb://localhost/platypus');

//configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);

app.listen(port, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('Platypus is listening on ' + port);
});

// Passport Configuration
require('./config/passportConfig.js')(app, session, passport);
require('./config/routes.js')(app, express, passport);
