var db = require('../config');

function allUsers(req, res, next) {
    db.any('select * from users')
        .then(function (data) {
            res.status(200)
                .json(data);
        })
        .catch(function (err) {
            return next(err);
        });
}

function singleUser(req, res, next) {
    var username = req.params.username;
    var query = "select * from users where username = '" + username + "'";

    db.one(query)
        .then(function (data) {
            res.status(200)
                .json(data);
        })
        .catch(function (err) {
            return next(err);
        });
}

function findUserByUsername(username) {
    var query = "select * from users where username = '" + username + "'";
    return db.one(query);
}

function findUser(username, email) {
    var query = "select * from users where username = '" + username + "' or email = '" + email + "'";
    return db.any(query);
}

function getUserById(id) {
    var query = "select * from users where id = '" + id + "'";
    return db.one(query);
}

module.exports = {
    allUsers: allUsers,
    singleUser: singleUser,
    findUserByUsername: findUserByUsername,
    getUserById: getUserById,
    findUser: findUser
};