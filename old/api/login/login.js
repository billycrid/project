var useragent = require('express-useragent');
var geoip = require('geoip-lite');

function login(req, res, next) {
    if (req.user) {
        req.session.info = {
            isMobile: useragent.parse(req.headers['user-agent']).isMobile,
            browser: useragent.parse(req.headers['user-agent']).browser,
            platform: useragent.parse(req.headers['user-agent']).platform,
            os: useragent.parse(req.headers['user-agent']).os,
            location: geoip.lookup(req.ip)
        }
        res.cookie('userid', req.user.id, { maxAge: 90000000 });
        res.status(200).json({ 
            status: 'success', 
            data: {
                username: req.user.username,
                email: req.user.username
            },
            message: 'You are now logged in, welcome back ' + req.user.username +'.'
        });
    }
}

function getLogin(req, res, next) {
    if (req.user) {
        req.session.info = {
            isMobile: useragent.parse(req.headers['user-agent']).isMobile,
            browser: useragent.parse(req.headers['user-agent']).browser,
            platform: useragent.parse(req.headers['user-agent']).platform,
            os: useragent.parse(req.headers['user-agent']).os,
            location: geoip.lookup(req.ip)
        }
        res.status(200).json({
            status: 'success', 
            data: {
                username: req.user.username,
                email: req.user.email
            },
            message: 'You are logged in.'
        });
    } else {
        res.status(200).json({
            status: 'error', 
            message: 'You are not logged in.'
        });
    }
}

function logout(req, res, next) {
    req.logout();
    res.clearCookie('userid');
    res.status(200).json({
        status: 'success', 
        message: 'You are now logged out.'
    });
}

function loginError(res) {
    return { 
        status: 'error', 
        message: 'Username or password is incorrect.'
    };
}

module.exports = {
    login: login,
    logout: logout,
    getLogin: getLogin  
};