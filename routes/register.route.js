const express = require('express');
const router = express.Router();
const { createUser, emailAvailable, usernameAvailable } = require('../controller/register.controller');
const { createuserValidator, isEmailAvailableValidator, isUsernameAvailableValidator } = require('../validators/register.validator');

router.post("/", createuserValidator,createUser);
router.get("/isEmailAvailable", isEmailAvailableValidator,emailAvailable)
router.get("/isUsernameAvailable", isUsernameAvailableValidator,usernameAvailable)


module.exports = router;