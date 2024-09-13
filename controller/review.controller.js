
const { createReviews } = require("../services/review.service");
const sendResponse = require("../utils/sendResponse");

const createReview = async (req, res) => {
    const { username, orderId, } = req.query;
    const reviewData = req.body;
    const response = await createReviews(username, orderId, reviewData);
    if (response) {
        sendResponse(res, 200, true, "Review sent successfully", response)
    }
    else {
        sendResponse(res, 400, false, "Failed to send review", response)
    }
}



module.exports = { createReview }