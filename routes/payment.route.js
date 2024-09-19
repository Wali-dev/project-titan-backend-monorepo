const express=require("express");
const { makepayment, sendSuccess, sendCancel } = require("../controller/payment.controller");
const router=express.Router();

router.post("/create-checkout-session",makepayment);
router.get("/paymentsuccess",sendSuccess);
router.get("/cancelpayment",sendCancel);

module.exports=router