const passport = require('passport');

const Authentication = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }

    res.status(400).send('You must log in to access this route')
  }
}

module.exports = Authentication
