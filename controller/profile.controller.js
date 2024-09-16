
const { getprofile, updateprofile, deleteprofile, addSocialItem, deleteSocialItem } = require("../services/profile.service");
const sendResponse = require("../utils/sendResponse");
// const profileValidator = require('../validators/profile.validator');


const getSingleProfile = async (req, res) => {
    const { username } = req.params;
    const response = await getprofile(username);
    if (response) {
        sendResponse(res, 200, true, "User fetched succesfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to fetch user", response)
    }
}

const deleteProfile = async (req, res) => {
    const { username } = req.params;
    const response = deleteprofile(username);
    if (response) {
        sendResponse(res, 200, true, "User profile deleted succesfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to delete profile", response)
    }
}

const updateProfile = async (req, res) => {
    const { id } = req.params;
    const userdata = req.body
    const response = await updateprofile(id, userdata);
    if (response) {
        sendResponse(res, 200, true, "User profile updated succesfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to update profile", response)
    }
}

const addSocialLink = async (req, res) => {
    const { username, platform, url } = req.body
    const response = await addSocialItem(username, platform, url);
    if (response) {
        sendResponse(res, 200, true, "Social link added succesfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to add social link", response)
    }
}

const deleteSocialLink = async (req, res) => {
    const { username, platform, url } = req.body
    const response = await deleteSocialItem(username, platform, url);
    if (response) {
        sendResponse(res, 200, true, "Social link deleted succesfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to delete social link", response)
    }
}


module.exports = {
    getSingleProfile,
    updateProfile,
    deleteProfile,
    addSocialLink,
    deleteSocialLink
};
