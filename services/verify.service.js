const verificationEmail = require("../email-templates/emailVerificationEmail");
const transporter = require("../utils/sendEmail");
require('dotenv').config()

module.exports.SendVerificationEmail = async () => {
    let verificationCode = 4343
    let userEmail = "cornelhassan780@gmail.com"
    let info = await transporter.sendMail({
        from: process.env.EMAIL_SENDER,
        to: userEmail,
        subject: "Titan | Account Verification",
        html: verificationEmail(verificationCode)
    });

}