const { pay } = require("../services/payment.service");
const orderModel = require("../models/order.model");
const sendResponse = require("../utils/sendResponse");

const makepayment=async(req,res)=>{
    const lineItem=[...req.body];
    const response=await pay(lineItem);
    if(response)sendResponse(res,200,"success",response);  
    else sendResponse(res,400,"failed",response);
}

const sendSuccess = async(req, res) => {
    const id = req.params.id;
    await orderModel.findByIdAndUpdate(id, { pending: false, completed: true });
    return sendResponse(res,200,"payment done successfully","done");
}
const sendCancel = async(req, res) => {
    const id = req.params.id;
    await orderModel.findByIdAndDelete(id);
    return sendResponse(res,200,"payment Canceled","done");
}

module.exports={makepayment,sendSuccess,sendCancel};