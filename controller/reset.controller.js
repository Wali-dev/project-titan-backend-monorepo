const { SendresetPasswordEmail, ResetPassword } = require("../services/reset.service");
const sendResponse = require("../utils/sendResponse");

const resetPassword=async(req,res)=>{
    const user=req.body;
    const response=await SendresetPasswordEmail(user);
    if(!response)sendResponse(res,400,"success","error",response);
    else{
        sendResponse(res,200,"success","Email sent successfully",response);
    }
}

const setPassword=async(req,res)=>{
    const{password,confirm_password}=req.body;
    const{id}=req.params;
    const response=await ResetPassword(id,password,confirm_password);
    if(!response)sendResponse(res,400,"success","error",response);
    else{
        sendResponse(res,200,"success","Email sent successfully",response);
    }
}

module.exports={resetPassword,setPassword};