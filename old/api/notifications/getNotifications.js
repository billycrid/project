var db = require('../config');

function getNotifications(req, res, next) {
    if (req.user) {
        var loggedInUserId = req.user.id;
        var query = `select count(distinct fromuserid)
        from messages m
        where touserid = '${loggedInUserId}' AND touserread = false`;
        console.log(query);
        db.any(query)
          .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    count: data[0].count,
                    message: 'You have notifications.'
                });
          })
          .catch(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'You have no notifications.'
                });
          });
    } else {
        res.status(403).json({ 
            status: 'error', 
            message: 'You are not logged in.'
        });
    }
}

module.exports = {
    getNotifications: getNotifications
};