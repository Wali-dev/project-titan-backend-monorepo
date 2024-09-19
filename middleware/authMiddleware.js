const profileModel = require("../models/profile.model.js")
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
const sendResponse = require("../utils/sendResponse");
dotenv.config();
const JWT_KEY = process.env.JWT_KEY;

const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            //Get token from header
            token = authorization.split(' ')[1];

            //Verify Token
            const { username } = jwt.verify(token, JWT_KEY);

            //Get user by token
            req.user = await profileModel.findOne({ username: username }).select("-password");
            next()
        } catch (error) {
            console.log(error);
            sendResponse(res, 400, false, "Unauthorized user")

        }
    }
    if (!token) {
        sendResponse(res, 400, false, "Token is required")
    }
}

module.exports = { checkUserAuth };