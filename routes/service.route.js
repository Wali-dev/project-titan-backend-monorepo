const express = require('express');
const { createPM, updatePM, createCall, updateCall, createDocument, updateDocument } = require('../controller/service.controller');
const router = express.Router();

router.post('/text/:username', createPM);
router.patch('/text', updatePM);

router.post('/call/:username', createCall);
router.patch('/call', updateCall);

router.post('/document/:username', createDocument);
router.patch('/document', updateDocument);


module.exports = router;