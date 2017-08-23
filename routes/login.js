var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStratergy = require('passport-local').Strategy;
// var BasicStrategy = require('passport-http').BasicStrategy;
var bcrypt = require('bcryptjs');

var login = require('../api/login/login');

router.get('/api/login', login.getLogin);
router.get('/api/logout', login.logout);

passport.use(new LocalStratergy(
    function(username, password, done) {
        getUsers
            .findUserByUsername(username)
            .then(function(userLoginData) {
                if (!userLoginData) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                bcrypt.compare(password, userLoginData.password, function(err, isMatch) {
                    if (isMatch) {
                        return done(null, userLoginData);
                    } else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            })
            .catch(function(error){
                return done(error);
            });
    }
));

// passport.use(new BasicStrategy(
//     function(username, password, done) {
//         console.log(username);
//         getUsers
//             .findUserByUsername(username)
//             .then(function(userLoginData) {
//                 if (!userLoginData) {
//                     return done(null, false, { message: 'Incorrect username.' });
//                 }
//                 bcrypt.compare(password, userLoginData.password, function(err, isMatch) {
//                     if (isMatch) {
//                         return done(null, userLoginData);
//                     } else {
//                         return done(null, false, { message: 'Incorrect password.' });
//                     }
//                 });
//             })
//             .catch(function(error){
//                 return done(error);
//             });
//     }
//   ));

passport.serializeUser(function(userLoginData, done) {
    done(null, userLoginData.id);
  });
  
passport.deserializeUser(function(id, done) {
    getUsers
        .getUserById(id)
        .then(function (user) {
            done(null, user);
        })
        .catch(function (err) {
            done(err, null);
        })
});

router.post('/api/login', passport.authenticate('local'), login.login);

module.exports = router;