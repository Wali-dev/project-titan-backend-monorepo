const { pay, paymentComplete, paymentIncomplete } = require("../services/payment.service");
const sendResponse = require("../utils/sendResponse");

const makepayment = async (req, res) => {
    const { orderId } = req.body;
    const response = await pay(orderId);
    if (response) {
        sendResponse(res, 200, true, response);
    }
    else sendResponse(res, 400, false, response);
}

const sendSuccess = async (req, res) => {
    const { orderId } = req.params;
    const response = await paymentComplete(orderId);
    if (response) sendResponse(res, 200, true, "Payment confirmed");
    if (!response) sendResponse(res, 400, false, "Payment confirm failed");
}

const sendCancel = async (req, res) => {
    const { orderId } = req.params;
    const response = await paymentIncomplete(orderId);
    if (response) sendResponse(res, 200, true, "Payment not confirmed, order deleted");
    if (!response) sendResponse(res, 400, false, "Payment confirm order delete failed");
}

module.exports = { makepayment, sendSuccess, sendCancel };