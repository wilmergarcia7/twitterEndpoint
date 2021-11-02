var express = require('express');
const passport = require('passport');
var router = express.Router();
//var passport = require('./passport');

router.get('/', function(req, res) {
    res.render('index');
  });
router.get('/twitter/login', passport.authenticate('twitter'));

router.get('/twitter/return', passport.authenticate('twitter',
{
  failureRedirect: '/'
}), 
function(req, res)
{ 
  res.redirect('/')
});

module.exports = router;