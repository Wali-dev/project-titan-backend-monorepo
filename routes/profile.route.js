const express = require('express');
const { getSingleProfile } = require("../controller/profile.controller");
const router = express.Router();


router.get("/:username", getSingleProfile);
// router.patch("/:id", updateProfile);
// router.delete("/:id", deleteProfile);

module.exports = router;