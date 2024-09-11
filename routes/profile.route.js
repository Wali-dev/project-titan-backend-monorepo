const express = require('express');
const { getSingleProfile, updateProfile, deleteProfile, addSocialLink, deleteSocialLink } = require("../controller/profile.controller");
const { getSingleProfileValidator,updateProfileValidator } = require('../validators/profile.validator');

const router = express.Router();

router.get("/:username",getSingleProfileValidator ,getSingleProfile);
router.patch("/:id",updateProfileValidator,updateProfile);
router.patch("/delete/:username",getSingleProfileValidator,deleteProfile);

//Social link
router.post("/social", addSocialLink);
router.delete("/social", deleteSocialLink);



module.exports = router;

// 66d9b7e594368c80858a7736