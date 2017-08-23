var express = require('express');
var router = express.Router();

var getUsers = require('../api/users/getUsers');
var postUsers = require('../api/users/postUsers');

router.get('/api/users', getUsers.allUsers);
router.get('/api/users/:username', getUsers.singleUser);

router.post('/api/users', postUsers.createUser);

module.exports = router;