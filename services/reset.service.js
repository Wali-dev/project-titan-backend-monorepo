const resetPasswordEmail = require("../email-templates/passwordResetEmail");
const profileModel = require("../models/profile.model");
const transporter = require("../utils/sendEmail");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports.SendresetPasswordEmail = async (use) => {
    try {
        const user = await profileModel.findOne({ email:use.email });
        const token = jwt.sign({ userID: user._id }, use.id+process.env.JWT_KEY, { expiresIn: '30m' });
        const link = `http://localhost:8000/api/v1/reset/resetpassword/${user._id}`;
        if (!user) {
            return "No user found"
        } else {
            const userEmail = user.email;
            let info = await transporter.sendMail({
                from: process.env.EMAIL_SENDER,
                to: userEmail,
                subject: "Titan | Reset password",
                html: resetPasswordEmail(link)
            });
            const expireDate = new Date();
            expireDate.setHours(expireDate.getHours() + 1);
            const verificationUrlExpire = expireDate;

            const response = await user.updateOne({
                // verificationCode: verifyUrl,
                verificationCodeExpire: verificationUrlExpire
            });
            if (response) {
                return "Email sent"
            } else {
                return "Failed to send email"
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.ResetPassword=async(id,password,cnfPassword)=>{
    try {
        const user=profileModel.findOne({id});
        if(password===cnfPassword){
            const salt = await bcrypt.genSalt(7);
            const hash=await bcrypt.hash(password,salt);
            const response = await user.updateOne({
                password: hash
            });
            if (response) {
                return "password changed successfully"
            } else {
                return "Failed to reset password"
            }
        }
        else{
            return "Password in both the fields do not match"
        }
        
    } catch (error) {
        console.log(error);
    }
    
}