var db = require('../config');

function deleteSession(req, res, next) {
    if(req.user) {
        var sessionId = req.params.sessionId;
        var query = "DELETE FROM session WHERE sess->'passport'->>'user' = '"+req.user.id+"' AND sid = '"+sessionId+"'";
        db.any(query)
            .then(function (data) {
            res.status(202)
                .json({
                    status: 'success',
                    message: 'Session has been deleted.'
                });
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

function deleteSessions(req, res, next) {
    if(req.user) {
        var query = "DELETE FROM session WHERE sess->'passport'->>'user' = '"+req.user.id+"' AND sid != '"+req.sessionID+"'";
        db.any(query)
            .then(function (data) {
            res.status(202)
                .json({
                    status: 'success',
                    message: 'Session has been deleted.'
                });
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
  deleteSession: deleteSession,
  deleteSessions: deleteSessions
};