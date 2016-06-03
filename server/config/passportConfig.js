var GitHubStrategy = require('passport-github').Strategy;
var User = require('../users/userModel.js');

module.exports = function(app, session, passport) {
  app.use(session({
    secret: 'asdf',
    resave: true,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: null }
    }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GitHubStrategy({
    clientID: '58538d6731e5d342c956',
    clientSecret: 'a97deeaf0cc14149773b419f9dcc48b35ed0f6a2',
    callbackURL: 'http://127.0.0.1:8000/github/callback'
  }, function(accessToken, refreshToken, profile, callback) {
    User
      .findOne({'gitHubHandle': profile.username}, function(err, found) {
        if (found) {
          callback(null, found);
        } else {
          User.create({
            name: profile.displayName === null ? profile.username : profile.displayName,
            gitHubHandle: profile.username,
            email: profile._json.email,
            image: profile.photos[0].value
          }, function(err, newUser) {
            console.log('user created ', newUser);
            callback(null, newUser);
          });
        }
      })
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.get('id'));
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });
};
