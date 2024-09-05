const express = require('express');
const { handleSignin } = require('../controller/auth.controller');
const router = express.Router();

router.get("/", handleSignin);

module.exports = router;