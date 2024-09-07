const { addCall, updateCalls } = require("../services/call.service");
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
        sendResponse(res, 400, false, "Failed to update pririoty message", response)
    }
}

const createCall = async (req, res) => {
    const { username } = req.params;
    const callServiceData = req.body
    const response = await addCall(username, callServiceData);
    if (response) {
        sendResponse(res, 200, true, "Call created successfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to create call", response)
    }
}

const updateCall = async (req, res) => {
    const { username, callserviceId } = req.query;
    const updatedCallData = req.body;
    const response = await updateCalls(username, callserviceId, updatedCallData);
    if (response) {
        sendResponse(res, 200, true, "Call updated successfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to update call", response)
    }
}




module.exports = { createPM, updatePM, createCall, updateCall }