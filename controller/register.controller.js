
const { registerUser } = require('../services/register.service');
const sendResponse = require('../utils/sendResponse');


const createUser = (req, res) => {
    const userdata = req.body;
    const response = registerUser(userdata);
    sendResponse(res, 200, true, "User created succesfully", response)
}


module.exports = {
    createUser
};
