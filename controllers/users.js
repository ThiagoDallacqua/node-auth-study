const Authentication = require('../middlewares/Authentication')
const passport = require('passport')
const logger = require('../services/logger.js');

module.exports = app => {
  app.post('/users/login', (req, res) => {
    req.assert('username', 'A valid username must be informed!')
      .notEmpty();

    req.assert('password', 'A valid password must be informed!')
      .notEmpty();

    let erros = req.validationErrors();

    if (erros) {
      console.log(`validation errors in the login${JSON.stringify(errors)}`);
      logger.error(`validation errors in the login: ${erros}`);

      res.status(400).send(erros);
      return
    }

    let connect = app.infra.connectionFactory;

    connect();

    passport.authenticate('local', { failureFlash: 'Invalid username or password.' })(req, res, () => {
      // console.log(req.session);
      res.json({ id: req.user.id, username: req.user.username })
    })
  });

  app.post('/users/login/cookie', (req, res) => {
    let cookie = req.cookies;
    console.log(cookie);
    let connect = app.infra.connectionFactory;

    connect();

    // passport.authenticate('local', { failureFlash: 'Invalid username or password.' })(req, res, () => {
    //   let cookie = req.cookies.cookieName;
    //   var cookieValue = { id: req.user.id, username: req.user.username }
    //
    //   if (cookie === undefined){
    //     res.cookie('user_session_cookie', cookieValue).send('Cookie is set');
    //     return
    //   }else{
    //     console.log('cookie exists', cookie);
    //   }
    //
    //   res.json({ id: req.user.id, username: req.user.username })
    // })
  });

  app.post('/users', (req, res) => {
    req.assert('username', 'A valid username must be informed!')
      .notEmpty();

    req.assert('password', 'A valid password must be informed!')
      .notEmpty();

    let erros = req.validationErrors();

    if (erros) {
      console.log(`validation in the resgistration errors ${JSON.stringify(errors)}`);
      logger.error(`validation in the resgistration errors: ${erros}`);

      res.status(400).send(erros);
      return
    }

    let model = app.models.user;
    let connect = app.infra.connectionFactory;
    let user = new app.infra.UserDAO(model, connect);

    let username = req.body.username;
    let pswd = req.body.password;

    user.register({user: username, pswd: pswd}, (err, user) =>{
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      passport.authenticate('local')(req, res, () =>{
        res.send(`You have been registered successfully ${user}`);
      })
    });
  })

  app.post('/comments', Authentication.isLoggedIn, (req, res) => {
    let model = app.models.comments;
    let connect = app.infra.connectionFactory;
    let Comments = new app.infra.CommentDAO(model, connect);

    let comment = {
      user: {
        id: req.user._id,
        username: req.user.username
       },
       comment: req.body.comment
    };

    Comments.create(comment, (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }
      //save the comment
      response.save();
    })



    res.send('ok');
  });

  app.get('/secret', Authentication.isLoggedIn, (req, res) => {
    let user = req.user;

    res.json(user)
  });

  app.get('/comments', Authentication.isLoggedIn, (req, res) => {
    let model = app.models.comments;
    let connect = app.infra.connectionFactory;
    let Comments = new app.infra.CommentDAO(model, connect);

    Comments.list(req.user._id, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }
      
      let comment = result.map(element => {
        return element.comment
      });

      res.json(comment)
    });
  });

  app.get('/logout', (req, res) => {
    req.logout()
    res.send('you have logged out')
  })
}
