var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    userjs = require('../models/user.js');
/*----------*/
/* OTHER ROUTES IN CLIENT/ROUTER.JS  */
/*----------*/
/*----------*/
/* REGIST NEW USER  */
/*----------*/
console.log("    ROUTES/API JS")
router.post('/register', function(req, res) {
  userjs.register(new userjs({ username: req.body.username }), req.body.password, function(err, account) {
    console.log("registering")
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});
/*----------*/
/* LOGIN USER  */
/*----------*/
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log("login " + user.username)
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});
/*----------*/
/* LOGOUT USER  */
/*----------*/
router.get('/logout', function(req, res) {
      console.log("logout")
  req.logout();
  res.status(200).json({status: 'Bye!'});
});
console.log("    ROUTES/API JS")
module.exports = router;