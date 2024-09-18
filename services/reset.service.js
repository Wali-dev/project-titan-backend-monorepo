const resetPasswordEmail = require("../email-templates/emailVerificationEmail");
const profileModel = require("../models/profile.model");
const transporter = require("../utils/sendEmail");
require('dotenv').config();

module.exports.SendresetPasswordEmail = async (use) => {
    try {
        const user = await profileModel.findOne({ email:use.email });
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '30m' });
        const link = `http://127.0.0.1:5500/api/v1/reset/reset-password/${user._id}/${token}`;
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
            const hash=bcrypt.hash(password);
            const response = await user.updateOne({
                // verificationCode: verifyUrl,
                password: hash
            });
            if (response) {
                return "Verification email sent"
            } else {
                return "Failed to send verification email"
            }
        }
        else{
            return "Password in both the fields do not match"
        }
        
    } catch (error) {
        console.log(error);
    }
    
}