var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var session = require('express-session');

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

//El consumer key y secret solo funciona 1 vez al conectarse, para volver a usarlo hay que generar nuevos token
passport.use(new TwitterStrategy({
  consumerKey: "NBBAzwkDH2xm0Vsu097U9kTIk",
  consumerSecret: "eVOifxXiHQ7qAKCq9dk3fIJX7PolNcJQajH9UoRCMucopiehQy",
  //accessToken: "1282808399365906432-8BNkS0rBJ5kGoEAHBxqg5jSnHOqfam",
 // accessTokenSecret:"CJaW7XEhM9ZtiOJ8ztCmAKMG1hk5HjJztICQFLBwtJFJg",
  callbackURL: "http://127.0.0.1:3000/twitter/return"
},
function(token, tokenSecret, profile, callback) {
 return callback(null, profile);
}));

passport.serializeUser(function(user, callback){
  callback(null, user);
  });
  
passport.deserializeUser(function(obj, callback){
  callback(null, obj);
  });
  

//var indexRouter = require('./routes/index');
//var apiRouter = require('./routes/api/index');
//var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'whatever', resave: true, saveUninitialized: true }));

// Inicializa la app y la sesion
app.use(passport.initialize());
app.use(passport.session());

//app.use('/', indexRouter);
//app.use('/api', apiRouter);
//app.use('/users', usersRouter);



//twitter


app.get('/', function(req, res) {
  res.render('index', {user: req.user});
});
app.get('/twitter/login', passport.authenticate('twitter'));

app.get('/twitter/return', passport.authenticate('twitter',
{ failureRedirect: '/' }), function(req, res) { 
res.redirect('/')
});

module.exports = app;
