const express = require('express');
const router = express.Router();
const { createUser, emailAvailable, usernameAvailable } = require('../controller/register.controller');
const { createuserValidator, isEmailAvailableValidator, isUsernameAvailableValidator } = require('../validators/register.validator');

router.post("/", createuserValidator, createUser);
router.post("/isEmailAvailable", isEmailAvailableValidator, emailAvailable)
router.post("/isUsernameAvailable", isUsernameAvailableValidator, usernameAvailable)


module.exports = router;