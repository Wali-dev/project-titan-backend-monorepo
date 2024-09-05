const profileModel = require('../models/profile.model');
const bcrypt = require('bcrypt');


const registerUser = async (userdata) => {
    try {
        if (userdata) {
            const { email, password, firstname, lastname } = userdata;

            //Checking if user is verified by email or not
            const isRegisteredByEmail = await profileModel.findOne({ email });
            if (isRegisteredByEmail) {
                return "Email is already registered"
            } else {
                const salt = await bcrypt.genSalt(7);
                const hashedPassword = await bcrypt.hash(password, salt);
                const userData = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: hashedPassword
                }
                const createdUser = await profileModel.create(userData);
                return createdUser;
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const emailUnique = async (email) => {
    try {
        if (email) {
            const emailExists = await profileModel.findOne({ email });
            if (!emailExists) {
                return "Email is available"
            } else {
                return "Email is not available"
            }
        }
    } catch (error) {
        console.log(error)
    }
}
const usernameUnique = async (username) => {
    try {
        if (username) {
            const usernameExists = await profileModel.findOne({ username });
            if (!usernameExists) {
                return "Username is available"
            } else {
                return "Username is not available"
            }
        }
    } catch (error) {
        console.log(error)
    }
}













module.exports = {
    registerUser,
    emailUnique,
    usernameUnique
};