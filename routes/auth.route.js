const express = require('express');
const { handleSignin, handleLogout, getLoggedUser } = require('../controller/auth.controller');
const { loginProfileValidator } = require('../validators/auth.validation');
const { checkUserAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.get("/login", loginProfileValidator, handleSignin);
router.get("/logout", handleLogout);
router.post("/login", loginProfileValidator, handleSignin);
router.get("/logged-user", checkUserAuth, getLoggedUser);

module.exports = router;