var db = require('../config');

function getPosts(req, res, next) {
    var query = "select * from posts";
    if (req.user) {
        db.any(query)
          .then(function (data) {
            res.status(200)
               .json({
                    status: 'success',
                    data: data,
                    count: data[0].totalCount || data.length,
                    message: 'Found posts..'
                });
          })
          .catch(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'No posts found.'
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
    getPosts: getPosts
};