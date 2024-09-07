const express = require('express');
const { createPM, updatePM } = require('../controller/service.controller');
const router = express.Router();

router.post('/pmessage/:username', createPM);
router.patch('/pmessage', updatePM);

module.exports = router;