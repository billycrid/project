var express = require('express');
var router = express.Router();

var getUsers = require('../api/users/getUsers');
var postUsers = require('../api/users/postUsers');

router.get('/users', getUsers.allUsers);
router.get('/users/:username', getUsers.singleUser);

router.post('/users', postUsers.createUser);

module.exports = router;