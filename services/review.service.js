const profileModel = require("../models/profile.model");
const Review = require("../models/review.model");
const Order = require("../models/order.model");
const mongoose = require('mongoose');

module.exports.createReviews = async (username, orderId, reviewData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const profile = await profileModel.findOne({ username }).session(session);
        if (!profile) {
            await session.abortTransaction();
            session.endSession();
            return 'Profile not found';
        }

        const order = await Order.findById(orderId).session(session);
        if (!order) {
            await session.abortTransaction();
            session.endSession();
            return 'Order not found';
        }

        reviewData.username = username;
        reviewData.orderId = orderId;

        const newReview = new Review(reviewData);
        await newReview.save({ session });

        if (!profile.reviews) {
            profile.reviews = [];
        }
        profile.reviews.push(newReview._id);

        try {
            await profile.save({ session });
        } catch (validationError) {
            console.error('Validation error:', validationError);
            await session.abortTransaction();
            session.endSession();
            return 'Failed to add review to profile';
        }

        await session.commitTransaction();
        session.endSession();

        return newReview;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error adding review:', error);

        return 'Failed to add review';
    }
}