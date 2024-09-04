const profileModel = require('../models/profile.model');



const registerUser = async (userdata) => {
    try {
        if (userdata) {
            const createdUser = await profileModel.create(userdata);
            await createdUser.save();
            return createdUser

        }
    } catch (error) {
        console.log(error)

    }
}















module.exports = {
    registerUser
};