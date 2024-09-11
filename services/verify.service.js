const verificationEmail = require("../email-templates/emailVerificationEmail");
const profileModel = require("../models/profile.model");
const transporter = require("../utils/sendEmail");
require('dotenv').config();

module.exports.SendVerificationEmail = async (username) => {
    try {
        const user = await profileModel.findOne({ username });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        if (!user) {
            return "No user found"
        } else {
            const userEmail = user.email;
            let info = await transporter.sendMail({
                from: process.env.EMAIL_SENDER,
                to: userEmail,
                subject: "Titan | Account Verification",
                html: verificationEmail(verifyCode)
            });

            const expireDate = new Date();
            expireDate.setHours(expireDate.getHours() + 1);
            const verificationCodeExpire = expireDate;

            const response = await user.updateOne({
                verificationCode: verifyCode,
                verificationCodeExpire: verificationCodeExpire
            });
            if (response) {
                return "Verification email sent"
            } else {
                return "Failed to send verification email"
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.VerifyAccount = async (username, verificationCode) => {
    try {
        const user = await profileModel.findOne({ username });
        if (!user) {
            return "User not found"
        } else {
            verificationCode.toString();
            if (verificationCode === user.verificationCode) {
                const isCodeNotExpired = new Date(user.verifyCodeExpire) > new Date;
                if (!isCodeNotExpired) {
                    await user.updateOne({ isVerified: true })
                    return "Account verified successfully"
                } else {
                    return "verification code expired, please resend verification email"
                }
            } else {
                return "Verification code does not match"
            }
        }
    } catch (error) {
        console.log(error)
    }
}