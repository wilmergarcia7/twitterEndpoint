var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var conn = require('../../utils/dao');

passport.use(new TwitterStrategy({
  consumerKey: "",
  consumerSecret: "",
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



module.exports = passport;