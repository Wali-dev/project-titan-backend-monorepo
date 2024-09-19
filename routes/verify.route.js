const express = require('express');
const { sendVerificationEmail, verifyAccount } = require('../controller/verify.controller');
const { verificationEmailValidator, verifyAccountValidator } = require('../validators/verify.validator');
const router = express.Router();

router.get('/:username', verificationEmailValidator, sendVerificationEmail);
router.post('/', verifyAccountValidator, verifyAccount);

module.exports = router;