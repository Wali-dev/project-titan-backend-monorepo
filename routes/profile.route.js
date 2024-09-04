const express = require('express');
const { create } = require("../controller/profile.controller");
const router = express.Router();

router.post("/create", create);
// router.get("/:id", getProfile);
// router.patch("/:id", updateProfile);
// router.delete("/:id", deleteProfile);

module.exports = router;