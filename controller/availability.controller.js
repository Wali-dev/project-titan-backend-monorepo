
const { createAvailability, updateavailability } = require("../services/availability.service");
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


module.exports = {
    addAvailability,
    updateAvailability
};
