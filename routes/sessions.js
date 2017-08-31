var express = require('express');
var router = express.Router();

var getSessions = require('../api/sessions/getSessions');
var deleteSession = require('../api/sessions/deleteSessions');

router.get('/sessions', getSessions.getSessions);
router.delete('/sessions/:sessionId', deleteSession.deleteSession);
router.delete('/sessions', deleteSession.deleteSessions);

module.exports = router;