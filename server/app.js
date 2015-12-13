// dependencies
var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');
    
console.log("loaded all requires")
// mongoose
console.log("connect mongodb")
mongoose.connect('mongodb://localhost/mean-auth');

// create instance of express
console.log("start app")
var app = express();

// require routes
console.log("load routes")
var routes = require('./routes/api.js');
console.log("done load routes")
// define middleware

console.log("using middleware")
app.use(express.static(path.join(__dirname, '../client')));         //middleware for static
app.use(logger('dev'));                                             //console log all w morgan

app.use(bodyParser.json());                                         //bodyparser default
app.use(bodyParser.urlencoded({ extended: false }));                //bodyparser default

//session stuff
var expressSession = require('express-session');                    //
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// configure passport
var passport = require('passport'),                                 //
localStrategy = require('passport-local' ).Strategy;                //
// passport needs user model
var userjs = require('./models/user.js');
console.log("start passport")
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(userjs.authenticate()));
passport.serializeUser(userjs.serializeUser());
passport.deserializeUser(userjs.deserializeUser());

// routes
console.log("using routes")
app.use('/user/', routes);                                              //reqd for login logout

// error handlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

module.exports = app;
