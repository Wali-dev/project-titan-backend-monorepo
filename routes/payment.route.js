const express=require("express");
const { makepayment, sendSuccess, sendCancel } = require("../controller/payment.controller");
const router=express.Router();

router.post("/create-checkout-session",makepayment);
router.get("/paymentsuccess/:id",sendSuccess);
router.get("/cancelpayment/:id",sendCancel);

module.exports=router