const express = require('express');
const create=require("../controller/profile.controller");
const router = express.Router();


router.post("/create", create);
// router.get("/:id",getprofile);
// router.patch("/:id",updateprofile);
// router.delete("/:id",deleteprofile);



module.exports = router;