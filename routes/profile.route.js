const express = require('express');
const { getSingleProfile, updateProfile, deleteProfile, addSocialLink, deleteSocialLink, sendForgetPasswordEmail, userPasswordReset } = require("../controller/profile.controller");
const { getSingleProfileValidator, updateProfileValidator } = require('../validators/profile.validator');
const { addAvailability, updateAvailability, getAllAvailability } = require('../controller/availability.controller');
const { passwordValidator } = require('../validators/reset.identifier.validator');

const router = express.Router();

router.get("/:username", getSingleProfileValidator, getSingleProfile);
router.patch("/:id", updateProfileValidator, updateProfile);
router.patch("/delete/:username", getSingleProfileValidator, deleteProfile);

//Social link
router.post("/social", addSocialLink);
router.delete("/social", deleteSocialLink);

//Availability link
router.post("/availability/:username", addAvailability)
router.patch("/availability/:username/:availabilityId", updateAvailability)
router.get("/availability/:username", getAllAvailability)

//Reset password
router.post("/change-password",)

//Forget password
router.post("/send-reset-password-email", sendForgetPasswordEmail)
router.post("/reset-password/:id/:token", passwordValidator, userPasswordReset);

module.exports = router;
