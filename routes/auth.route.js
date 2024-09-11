const express = require('express');
const { handleSignin, handleLogout } = require('../controller/auth.controller');
const { loginProfileValidator } = require('../validators/auth.validation');
const router = express.Router();

router.get("/login",loginProfileValidator ,handleSignin);
router.get("/logout", handleLogout);
router.post("/login", loginProfileValidator,handleSignin);

module.exports = router;