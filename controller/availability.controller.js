
const { createAvailability, updateavailability, getAllAvailabilities } = require("../services/availability.service");
const sendResponse = require("../utils/sendResponse");


const addAvailability = async (req, res) => {
    const { username } = req.params;
    const availabilityDatas = req.body
    const response = await createAvailability(username, availabilityDatas);
    if (response) {
        sendResponse(res, 200, true, "Availability created succesfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to availability", response)
    }
}

const updateAvailability = async (req, res) => {
    const { username, availabilityId } = req.params
    const updateData = req.body
    const response = await updateavailability(username, availabilityId, updateData);
    if (response) {
        sendResponse(res, 200, true, "Availability updated succesfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to update availability", response)
    }
}

const getAllAvailability = async (req, res) => {
    const { username } = req.params
    const response = await getAllAvailabilities(username);
    if (response) {
        sendResponse(res, 200, true, "Availabilities fetched succesfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to fetch availabilities", response)
    }
}


module.exports = {
    addAvailability,
    updateAvailability,
    getAllAvailability
};
