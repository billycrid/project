var db = require('../config');

function getSessions(req, res, next) {
    if(req.user) {
        var query = "SELECT sid, sess->'info' as \"info\" FROM session WHERE sess->'passport'->>'user' = '"+req.user.id+"' AND sid != '"+req.sessionID+"'";
        db.any(query)
            .then(function (data) {
            res.status(200)
                .json(data);
            })
            .catch(function (err) {
                return next(err);
            });
    } else {
        res.status(403).json({ 
            status: 'error', 
            message: 'You are not logged in.'
        });
    }
}

module.exports = {
  getSessions: getSessions
};