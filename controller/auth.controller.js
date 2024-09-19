const { handleSignIn, handleSignOut } = require("../services/auth.service");
const sendResponse = require("../utils/sendResponse");

const handleSignin = async (req, res) => {
    const { identifier, password } = req.body
    const response = await handleSignIn(identifier, password);
    if (response) {
        res.cookie("accesstoken", response, { httpOnly: true });
        sendResponse(res, 200, true, "Login successful", response);
    } else {
        sendResponse(res, 400, false, "login failed", response);
    }

}

const handleLogout = async (req, res) => {
    await handleSignOut(res);
}


const getLoggedUser = async (req, res) => {
    res.send({ "user": req.user })
    // res.send("this is the auth")
}











module.exports = { handleSignin, handleLogout, getLoggedUser }