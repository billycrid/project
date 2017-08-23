var db = require('../config');
var userInfo = require('./getUsers');
var bcrypt = require('bcryptjs');

function createUser(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    req.checkBody('username', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).json(
            errors
        );
    } else {
        userInfo
            .findUserByUsername(username)
            .then(function(data) {
               if (data) {
                    res.status(400).json({ 
                        status: 'error', 
                        message: 'Username already exists.'
                    });
               }
            })
            .catch(function(error) {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                        // Store hash in your password DB. 
                        db.none("INSERT INTO users (username, email, password) VALUES ('"+username+"', '"+email+"', '"+hash+"');")
                            .then(function (data) {
                                res.status(200).json({ 
                                    status: 'success', 
                                    message: 'User created.'
                                });
                            })
                            .catch(function (err) {
                                res.status(400).json(
                                    err
                                );
                            });
                    });
                });
            });
    }
}

module.exports = {
    createUser: createUser
};