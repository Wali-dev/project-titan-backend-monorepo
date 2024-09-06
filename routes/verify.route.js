const express = require('express');
const { sendVerificationEmail, verifyAccount } = require('../controller/verify.controller');
const router = express.Router();

router.get('/:username', sendVerificationEmail)
router.post('/', verifyAccount)

module.exports = router;