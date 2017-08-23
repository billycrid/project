function login(req, res, next) {
    console.log(req.sessionID);
    if (req.user) {
        res.cookie('userid', req.user.id, { maxAge: 2592000000 });
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
    console.log(req.sessionID);
    if (req.user) {
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