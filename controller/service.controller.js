const { addPriorityMessages, updatePMessage } = require("../services/priorityMessage.service");
const sendResponse = require("../utils/sendResponse");

const createPM = async (req, res) => {
    const { username } = req.params;
    const pmServiceData = req.body
    const response = await addPriorityMessages(username, pmServiceData);
    if (response) {
        sendResponse(res, 200, true, "Priority message created successfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to create priority message", response)
    }
}

const updatePM = async (req, res) => {
    const { username, pmserviceId } = req.query;
    const updatedPMessageData = req.body;
    const response = await updatePMessage(username, pmserviceId, updatedPMessageData);
    if (response) {
        sendResponse(res, 200, true, "Priority message updated successfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to update pririotyMessage", response)
    }
}





module.exports = { createPM, updatePM }