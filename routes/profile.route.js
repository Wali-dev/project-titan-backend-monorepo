const express = require('express');
const { getSingleProfile, updateProfile, deleteProfile } = require("../controller/profile.controller");

const router = express.Router();


router.get("/:username", getSingleProfile);
router.patch("/:id", updateProfile);
router.patch("/delete/:username", deleteProfile);

module.exports = router;