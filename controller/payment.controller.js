const { pay } = require("../services/payment.service");
const sendResponse = require("../utils/sendResponse");

const makepayment=async(req,res)=>{
    const lineItem=[...req.body];
    const response=await pay(lineItem);
    if(response)sendResponse(res,200,"success",response);  
    else sendResponse(res,400,"failed",response);
}

const sendSuccess=(req,res)=>{
    return sendResponse(res,200,"payment done successfully","done");
}
const sendCancel=(req,res)=>{
    return sendResponse(res,200,"payment Canceled","done");
}

module.exports={makepayment,sendSuccess,sendCancel};