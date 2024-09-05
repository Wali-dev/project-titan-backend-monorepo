const express = require('express');
const router = express.Router();
const { createUser, emailAvailable, usernameAvailable } = require('../controller/register.controller')

router.post("/", createUser)
router.get("/isEmailAvailable", emailAvailable)
router.get("/isUsernameAvailable", usernameAvailable)


module.exports = router;