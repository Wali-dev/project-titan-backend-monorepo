const express=require("express");
const { setPassword, resetPassword } = require("../controller/reset.controller");
const router=express.Router();

router.get('/resetpassword', resetPassword);
router.post('/resetpassword/:id', setPassword);

module.exports=router;