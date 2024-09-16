const express = require('express');
const { getSingleProfile, updateProfile, deleteProfile, addSocialLink, deleteSocialLink } = require("../controller/profile.controller");
const { getSingleProfileValidator, updateProfileValidator } = require('../validators/profile.validator');
const { addAvailability, updateAvailability, getAllAvailability } = require('../controller/availability.controller');

const router = express.Router();

router.get("/:username", getSingleProfileValidator, getSingleProfile);
router.patch("/:id", updateProfileValidator, updateProfile);
router.patch("/delete/:username", getSingleProfileValidator, deleteProfile);

//Social link
router.post("/social", addSocialLink);
router.delete("/social", deleteSocialLink);

//availability link
router.post("/availability/:username", addAvailability)
router.patch("/availability/:username/:availabilityId", updateAvailability)
router.get("/availability/:username", getAllAvailability)


module.exports = router;
