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

module.exports.addSocialItem = async (username, platform, url) => {
    try {
        const result = await profileModel.updateOne(
            { username: username },
            { $push: { social: { platform, url } } }
        );

        if (result.modifiedCount === 0) {
            return "Profile doesn't exist";
        }

        return "Social link added successfully";
    } catch (error) {
        console.error('Error adding social item:', error);
        throw error;
    }
}

module.exports.deleteSocialItem = async (username, platform, url) => {
    try {
        const result = await profileModel.updateOne(
            { username: username },
            { $pull: { social: { platform, url } } }
        );

        if (result.modifiedCount === 0) {
            return "No changes made. Item not found or profile doesn't exist.";
        }

        return "Social link deleted successfully";
    } catch (error) {
        console.error('Error deleting social link:', error);
        throw error;
    }
}

// // Function to update a social item
// async function updateSocialItem(username, oldPlatform, oldIdentifier, newPlatform, newIdentifier) {
//     try {
//         const result = await Profile.updateOne(
//             {
//                 username: username,
//                 'social.platform': oldPlatform,
//                 'social.identifier': oldIdentifier
//             },
//             {
//                 $set: {
//                     'social.$.platform': newPlatform,
//                     'social.$.identifier': newIdentifier
//                 }
//             }
//         );

//         if (result.modifiedCount === 0) {
//             return "No changes made. Item not found or profile doesn't exist.";
//         }

//         return "Social item updated successfully";
//     } catch (error) {
//         console.error('Error updating social item:', error);
//         throw error;
//     }
// }

