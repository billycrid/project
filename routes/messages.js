var express = require('express');
var router = express.Router();

var getMessages = require('../api/messages/getMessages');
var postMessages = require('../api/messages/postMessages');

router.get('/api/messages', getMessages.getMessages);
router.get('/api/messages/:username', getMessages.getMessageFromUsername);

router.post('/api/messages/:username', postMessages.createMessage);

module.exports = router;