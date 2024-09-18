const { updateCalls, addCallService, updateCallService } = require("../services/call.service");
const { addDocument, updateDocuments } = require("../services/document.service");
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
    const response = await addCallService(username, callServiceData);
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
    const response = await updateCallService(username, callserviceId, updatedCallData);
    if (response) {
        sendResponse(res, 200, true, "Call updated successfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to update call", response)
    }
}

const createDocument = async (req, res) => {
    const { username } = req.params;
    const documentServiceData = req.body
    const response = await addDocument(username, documentServiceData);
    if (response) {
        sendResponse(res, 200, true, "Document created successfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to create document", response)
    }
}

const updateDocument = async (req, res) => {
    const { username, documentserviceId } = req.query;
    const updatedDocumentData = req.body;
    const response = await updateDocuments(username, documentserviceId, updatedDocumentData);
    if (response) {
        sendResponse(res, 200, true, "Document updated successfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to update document", response)
    }
}



module.exports = { createPM, updatePM, createCall, updateCall, createDocument, updateDocument }