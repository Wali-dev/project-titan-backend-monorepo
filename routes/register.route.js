const express = require('express');
const router = express.Router();
const { createUser } = require('../controller/register.controller')

router.post("/", createUser)


module.exports = router;