const express = require('express');
const { getSingleProfile, updateProfile, deleteProfile, addSocialLink, deleteSocialLink } = require("../controller/profile.controller");

const router = express.Router();


router.get("/:username", getSingleProfile);
router.patch("/:id", updateProfile);
router.patch("/delete/:username", deleteProfile);

//Social link
router.post("/social", addSocialLink);
router.delete("/social", deleteSocialLink);



module.exports = router;