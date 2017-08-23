var db = require('../config');

var messageQuery = `select 
                    uf.username as "fromUsername",
                    ut.username as "tooUsername",
                    m.* 
                    from messages m
                    inner join users uf on uf.id = m.fromuserid
                    inner join users ut on ut.id = m.touserid`;

function getMessages(req, res, next) {
    if (req.user) {
        var loggedInUserId = req.user.id;
        var query = `
                    select distinct
                        uf.username
                    from messages m
                    inner join users uf on uf.id = m.fromuserid
                    where m.fromuserid = '${loggedInUserId}' or m.touserid = '${loggedInUserId}'
                    UNION
                    SELect distinct
                        ut.username
                    from messages m
                    inner join users ut on ut.id = m.touserid
                    where m.fromuserid = '${loggedInUserId}' or m.touserid = '${loggedInUserId}'`;
        db.any(query)
          .then(function (data) {
            res.status(200)
               .json({
                    status: 'success',
                    data: data,
                    count: data[0].totalCount || data.length,
                    message: 'You have messages.'
                });
          })
          .catch(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'You have no messages.'
                });
          });
    } else {
        res.status(403).json({ 
            status: 'error', 
            message: 'You are not logged in.'
        });
    }
}

function getMessageFromUsername(req, res, next) {
    if (req.user) {
        var username = req.params.username;
        var loggedInUserId = req.user.id;
        var query = messageQuery + ` where 
                                    (uf.username = '${username}' AND ut.id ='${loggedInUserId}') or 
                                    (ut.username = '${username}' AND uf.id ='${loggedInUserId}') 
                                    ORDER BY senttime DESC`
        
        var offset = req.query.offset;
        var limit = req.query.limit;

        if (offset && limit) {
            query = query + ` OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;`
        }
        
        db.any(query)
          .then(function (data) {
            res.status(200)
               .json({
                    status: 'success',
                    data: data,
                    count: data[0].totalCount || data.length,
                    message: 'You have messages.'
                });
          })
          .catch(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'You have no messages.'
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
    getMessages: getMessages,
    getMessageFromUsername: getMessageFromUsername
};