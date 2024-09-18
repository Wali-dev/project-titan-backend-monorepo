const profileModel = require("../models/profile.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require("../utils/sendEmail");
require('dotenv').config()
const forgotPasswordEmail = require("../email-templates/forgotPasswordEmail")


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

module.exports.changepassword = async (password) => {
    if (password) {

    }
}

module.exports.sendPasswordResetemail = async (identifier, url) => {
    try {
        if (!identifier) {
            return "Credential is needed"
        } else {
            const profile = await profileModel.findOne({
                $or: [
                    { email: identifier },
                    { username: identifier }
                ],
                isVerified: true
            });
            if (!profile) {
                return "No user exists with this identifier"
            } else {
                const secret = profile._id + process.env.JWT_KEY;
                const token = jwt.sign({ username: profile.username }, secret, { expiresIn: '30m' });
                const link = `${url}/api/v1/profile/${profile._id}/${token}`

                const userEmail = profile.email;
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_SENDER,
                    to: userEmail,
                    subject: process.env.RESET_PASSWORD_EMAIL,
                    html: forgotPasswordEmail(link)
                });

                if (info) {
                    return "Reset password email successfully sent"
                }
                else {
                    return "Can not send reset password email"
                }
            }
        }
    } catch (error) {
        console.log(error);
        return "Failed to sent reset password email"

    }
}

module.exports.passwordReset = async (password, id, token) => {
    try {
        if (password && id && token) {
            const profile = await profileModel.findById(id);
            if (!profile) {
                return "No user exists with this identifier"
            } else {
                const new_secret = profile._id + process.env.JWT_KEY;
                const jwt_verification = jwt.verify(token, new_secret);
                if (jwt_verification) {
                    const salt = await bcrypt.genSalt(7);
                    const hashedPassword = await bcrypt.hash(password, salt);

                    profile.password = hashedPassword;
                    await profile.save();
                    return "Password updated succesfully"
                } else {
                    return "Invalied token"
                }
            }
        }
        else {
            return "Password, id and token all needs to be provided"
        }


    } catch (error) {
        console.log(error)
        return "Failed to reset password"
    }

    try {
        jwt.verify(token, new_secret);
        if (password && password_confirmation) {
            if (password === password_confirmation) {
                const salt = await bcrypt.genSalt(7);
                const hashedPassword = await bcrypt.hash(password, salt);
                await UserModel.findByIdAndUpdate(user._id, {
                    $set: {
                        password: hashedPassword
                    }
                })
                res.send({ "status": "Success", "message": "Password reset Successfully" })

            } else {
                throw new Error("Passwords must match");
            }

        } else {
            throw new Error("All fields are required");
        }

    } catch (error) {
        next(error);

    }
}