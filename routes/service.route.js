const express = require('express');
const { createPM, updatePM, createCall, updateCall } = require('../controller/service.controller');
const router = express.Router();

router.post('/text/:username', createPM);
router.patch('/text', updatePM);

router.post('/call/:username', createCall);
router.patch('/call', updateCall);

module.exports = router;