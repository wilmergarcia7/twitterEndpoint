var express = require('express');
var router = express.Router();
var passport = require('./passport');
var session = require('express-session');

router.use(session({ secret: 'whatever', resave: true, saveUninitialized: true }));


router.get('/', function(req, res) {
    res.render('index', {user: req.user});
  });
router.get('/twitter/login', passport.authenticate('twitter'));
  
router.get('/twitter/return', passport.authenticate('twitter',
  { failureRedirect: '/' }), function(req, res) { 
  res.redirect('/')
  });
  router.use(passport.initialize());
router.use(passport.session());

module.exports = router;