const express = require('express');
const { createPM, updatePM, createCall, updateCall, createDocument, updateDocument } = require('../controller/service.controller');
const { createServiceValidator, updateServiceValidator, createCallServiceValidator, updatecallServiceValidator, createDocumentServiceValidator, updateDocumentServiceValidator } = require('../validators/service.validator');
const router = express.Router();

router.post('/text/:username', createServiceValidator,createPM);
router.patch('/text', updateServiceValidator,updatePM);

router.post('/call/:username', createServiceValidator,createCall);
router.patch('/call', updateServiceValidator,updateCall);

router.post('/document/:username', createServiceValidator,createDocument);
router.patch('/document', updateServiceValidator,updateDocument);


module.exports = router;