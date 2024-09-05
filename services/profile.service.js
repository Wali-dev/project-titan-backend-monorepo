const profileModel = require("../models/profile.model");


module.exports.getprofile = async (username) => {
    try {
        if (username) {
            const userProfile = await profileModel.findOne({ username, isDeleted: false }).select('-password');
            if (!userProfile) {
                return "No user found with this username";
            } else {
                return userProfile
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteprofile = async (username) => {
    try {
        if (username) {
            const profile = await profileModel.findOne({ username });
            if (!profile) {
                return "No user found with this username";
            }
            await profileModel.updateOne({ username }, { isDeleted: true });
            return "Profile deleted successfully";
        } else {
            return "Username is required";
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateprofile = async (id, userdata) => {
    try {
        if (id && userdata) {
            const userProfile = await profileModel.findById(id);
            if (userProfile) {
                await userProfile.updateOne(userdata);
                const updatedProfile = await profileModel.findById(id).select('-password');
                return updatedProfile;
            } else {
                return "Unable to find user";
            }
        }
    } catch (error) {
        console.log(error)
    }
}