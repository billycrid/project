var db = require('../config');
var userInfo = require('./getUsers');
var bcrypt = require('bcryptjs');

function createUser(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('firstName', 'First name is required').notEmpty();
    req.checkBody('lastName', 'Last name is required').notEmpty();
    req.checkBody('city', 'City is required').notEmpty();


    req.checkBody('username', 'Username must be a minimum of 4 characters').isLength({ min: 4, max: 30 });
    req.checkBody('email', 'Email cannot exceed 100 characters').isLength({ max: 100 });
    req.checkBody('email', 'First name cannot exceed 30 characters').isLength({ max: 30 });
    req.checkBody('email', 'Last name cannot exceed 30 characters').isLength({ max: 30 });
    req.checkBody('city', 'City cannot exceed 30 characters').isLength({ max: 30 });
    req.checkBody('password', 'Password must be between 5 and 16 characters').isLength({ min: 5, max: 16 });
    req.checkBody('password', 'Password must contain 1 number').matches(/\d/);

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).json(
            errors
        );
    } else {
        userInfo
            .findUser(username, email)
            .then(function(data) {
                if (data.length <= 0) {
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
                } else {
                    res.status(400).json({
                        status: 'error',
                        message: 'Username or Email already exists.'
                    });
                }
            })
            .catch(function(error) {
                console.log('error');
                console.log(error);
                res.status(400).json({
                    status: 'error',
                    message: 'Unknown error occurred.'
                });
            });
    }
}

module.exports = {
    createUser: createUser
};