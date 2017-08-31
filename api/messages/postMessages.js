var db = require('../config');
var userInfo = require('../users/getUsers');

function createMessage(req, res) {
    var username = req.params.username;
    var message = escape(req.body.message);

    req.checkBody('message', 'Message is required').notEmpty();

    var errors = req.validationErrors();

    if (req.user){
        var fromUserId = req.user.id;
        if (errors) {
            res.status(400).json(
                errors
            );
        } else {
            userInfo
                .findUserByUsername(username)
                .then(function(data) {
                    if (data) {
                        db.none("INSERT INTO messages (touserread, message, fromuserid, touserid) VALUES (false, '" + message + "', '" + fromUserId + "', '"+ data.id +"');")
                            .then(function (data) {
                                res.status(200).json({ 
                                    status: 'success', 
                                    message: 'Message was sent.'
                                });
                            })
                            .catch(function (err) {
                                res.status(400).json(
                                    err
                                );
                            });
                    }
                })
                .catch(function(error) {
                    res.status(400).json({ 
                        status: 'error', 
                        message: 'Username does not exist.'
                    });
                });
        }
    } else {
        res.status(403).json({ 
            status: 'error', 
            message: 'You are not logged in.'
        });
    }
}

module.exports = {
    createMessage: createMessage
};