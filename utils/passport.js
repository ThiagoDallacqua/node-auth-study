const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports = app => {
  passport.serializeUser(app.models.user.serializeUser());
  passport.deserializeUser(app.models.user.deserializeUser());
  passport.use(new LocalStrategy(app.models.user.authenticate()));

  return passport
}
