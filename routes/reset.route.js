const express=require("express");
const { setPassword, resetPassword } = require("../controller/reset.controller");
const router=express.Router();

router.get('/reset-password', resetPassword);
router.post('/reset-password/:id', setPassword);

module.exports=router;