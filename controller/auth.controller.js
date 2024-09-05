const { handleSignIn } = require("../services/auth.service");
const sendResponse = require("../utils/sendResponse");

const handleSignin = async (req, res) => {
    const { identifier, password } = req.body
    const response = await handleSignIn(identifier, password);
    if (response) {
        sendResponse(res, 200, true, "Login successful", response)
    } else {
        sendResponse(res, 400, false, "login failed", response)
    }

}















module.exports = { handleSignin }