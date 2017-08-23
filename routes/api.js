var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStratergy = require('passport-local').Strategy;
// var BasicStrategy = require('passport-http').BasicStrategy;
var bcrypt = require('bcryptjs');

var getUsers = require('../api/users/getUsers');
var postUsers = require('../api/users/postUsers');
var getMessages = require('../api/messages/getMessages');
var postMessages = require('../api/messages/postMessages');
var getNotifications = require('../api/notifications/getNotifications');
var login = require('../api/login/login');

router.get('/api/users', getUsers.allUsers);
router.get('/api/users/:username', getUsers.singleUser);

router.get('/api/messages', getMessages.getMessages);
router.get('/api/messages/:username', getMessages.getMessageFromUsername);

router.get('/api/login', login.getLogin);
router.get('/api/logout', login.logout);

router.get('/api/notifications', getNotifications.getNotifications);

router.post('/api/users', postUsers.createUser);
router.post('/api/messages/:username', postMessages.createMessage);


////////////////////////////////// Login
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