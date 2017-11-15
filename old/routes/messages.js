var express = require('express');
var router = express.Router();

var getMessages = require('../api/messages/getMessages');
var postMessages = require('../api/messages/postMessages');

router.get('/messages', getMessages.getMessages);
router.get('/messages/:username', getMessages.getMessageFromUsername);

router.post('/messages/:username', postMessages.createMessage);

module.exports = router;