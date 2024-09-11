
const { addOrder, updateorder } = require("../services/order.service");
const sendResponse = require("../utils/sendResponse");

const createOrder = async (req, res) => {
    const { username } = req.params;
    const orderData = req.body;
    const response = await addOrder(username, orderData);
    if (response) {
        sendResponse(res, 200, true, "Order created successfully", response)
    } else {
        sendResponse(res, 400, false, "Order creation has failed", response)
    }

}
const updateOrder = async (req, res) => {
    const { username, orderId } = req.query;
    const updatedOrderData = req.body;
    const response = await updateorder(username, orderId, updatedOrderData);
    if (response) {
        sendResponse(res, 200, true, "Order updated successfully", response)
    } else {
        sendResponse(res, 400, false, "Failed to update order", response)
    }

}















module.exports = { createOrder, updateOrder }