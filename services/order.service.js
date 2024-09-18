const profileModel = require("../models/profile.model");
const Order = require("../models/order.model");
const mongoose = require('mongoose');

module.exports.addOrder = async (username, orderData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const profile = await profileModel.findOne({ username }).session(session);
        if (!profile) {
            await session.abortTransaction();
            session.endSession();
            return 'Profile not found';
        }

        orderData.username = username; //add the order into the orderData obj

        const newOrder = new Order(orderData);
        await newOrder.save({ session });

        if (!profile.orders) {
            profile.orders = [];
        }
        profile.orders.push(newOrder._id);

        try {
            await profile.save({ session });
        } catch (validationError) {
            console.error('Validation error:', validationError);
            await session.abortTransaction();
            session.endSession();
            return 'Failed to add order to profile';
        }

        await session.commitTransaction();
        session.endSession();

        return newOrder;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error adding order:', error);

        return 'Failed to add order';
    }
}

module.exports.updateorder = async (username, orderId, updatedOrderData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const profile = await profileModel.findOne({ username }).session(session);
        if (!profile) {
            await session.abortTransaction();
            session.endSession();
            return 'Profile not found';
        }

        if (!profile.orders) {
            await session.abortTransaction();
            session.endSession();
            return 'No orders found for this profile';
        }

        if (!profile.orders.includes(orderId)) {
            await session.abortTransaction();
            session.endSession();
            return 'Order not found for this profile';
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            updatedOrderData,
            { new: true, session }
        );

        if (!updatedOrder) {
            await session.abortTransaction();
            session.endSession();
            return 'Order not found';
        }

        await session.commitTransaction();
        session.endSession();

        return updatedOrder;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error updating order:', error);
        return 'Failed to update order';
    }
};