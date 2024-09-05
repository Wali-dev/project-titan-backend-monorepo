const express = require('express');
const { sendVerificationEmail } = require('../controller/verify.controller');
const router = express.Router();

router.get('/', sendVerificationEmail)

module.exports = router;