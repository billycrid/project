var express = require('express');
var router = express.Router();

var getPosts = require('../api/posts/getPosts');
var getNotifications = require('../api/notifications/getNotifications');

router.get('/posts', getPosts.getPosts);

router.get('/notifications', getNotifications.getNotifications);

module.exports = router;