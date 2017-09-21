const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const passport = require('passport');
const logger = require('../services/logger.js');

const sess = (process.env.NODE_ENV == 'production')
  ? {
    secret: "secure application created",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, name: 'user_session' }
  }
  : {
    secret: "secure application created",
    resave: false,
    saveUninitialized: false,
    cookie: { name: 'user_session' }
  };

module.exports = function() {
  const app = express();

  app.use(morgan("common", {
    stream: {
      write: function(message) {
        logger.info(message)
      }
    }
  }));
  app.use(bodyParser.json());
  app.use(expressValidator());

  app.use(require('express-session')(sess));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req, res, next) { //CORS config
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  consign()
  .include('controllers')
  .then('infra')
  .then('models')
  .then('utils')
  .then('middlewares')
  .into(app);

  return app
}
