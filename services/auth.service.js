const profileModel = require("../models/profile.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

JWT_KEY = process.env.JWT_KEY

module.exports.handleSignIn = async (identifier, password) => {
    try {
        if (identifier && password) {
            const email = identifier;
            const user = await profileModel.findOne({
                $or: [
                    { email: identifier },
                    { username: identifier }
                ]
            });
            if (!user) {
                return "No user exists with this identifier"
            } else {
                isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    //generate JWT TOKEN
                    const accesstoken = jwt.sign({ username: user.username }, JWT_KEY, { expiresIn: '1d' });
                    return accesstoken
                } else {
                    return "Password does not match"
                }
            }
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports.handleSignOut = (res) => {
    res
        .clearCookie("accessToken", {
            sameSite: "none",
            secure: true,
            path: "/"
        })
        .status(200)
        .send("User has been logged out.");
}