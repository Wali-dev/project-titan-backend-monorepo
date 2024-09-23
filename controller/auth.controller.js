const { handleSignIn, handleSignOut } = require("../services/auth.service");
const sendResponse = require("../utils/sendResponse");
const statusCode = require("http-status-codes")

const handleSignin = async (req, res) => {
    const { identifier, password } = req.body;
    const response = await handleSignIn(identifier, password);

    if (response) {
        res.cookie("accesstoken", response, { httpOnly: true });
        if (response === "No user exists with this identifier" || response === "Password does not match") {
            return sendResponse(res, 200, false, "Login failed", response);
        }
        return sendResponse(res, 200, true, "Login successful", response);
    } else {
        return sendResponse(res, 400, false, "Login failed", response);
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