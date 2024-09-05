
const { registerUser, emailUnique, usernameUnique } = require('../services/register.service');
const sendResponse = require('../utils/sendResponse');


const createUser = async (req, res) => {
    const userdata = req.body;
    const response = await registerUser(userdata);
    if (response) {
        sendResponse(res, 200, true, "User created succesfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to create user", response)
    }
}
const emailAvailable = async (req, res) => {
    const { email } = req.body;
    const response = await emailUnique(email);
    if (response) {
        sendResponse(res, 200, true, response)
    }
    else {
        sendResponse(res, 400, false, "Failed to verify email", response)
    }
}
const usernameAvailable = async (req, res) => {
    const { username } = req.body;
    const response = await usernameUnique(username);
    if (response) {
        sendResponse(res, 200, true, response)
    }
    else {
        sendResponse(res, 400, false, "Failed to verify username", response)
    }
}


module.exports = {
    emailAvailable,
    createUser,
    usernameAvailable
};
