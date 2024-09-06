const { SendVerificationEmail, VerifyAccount } = require("../services/verify.service");
const sendResponse = require("../utils/sendResponse");

const sendVerificationEmail = async (req, res) => {
    const { username } = req.params;
    const response = await SendVerificationEmail(username);
    if (response) {
        sendResponse(res, 200, true, "Verification email sent successfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to send verification email", response)
    }
}

const verifyAccount = async (req, res) => {
    const { username, verificationCode } = req.query;
    if (username && verificationCode) {
        const response = await VerifyAccount(username, verificationCode);
        if (response) {
            sendResponse(res, 200, true, "Account verified successfully", response)
        }
        else {
            sendResponse(res, 400, false, "Failed to verify account", response)
        }
    } else {
        sendResponse(res, 400, false, "Both username and verification code are required")
    }
}

















module.exports = { sendVerificationEmail, verifyAccount }