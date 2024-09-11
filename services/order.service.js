const profileModel = require("../models/profile.model");

module.exports.addOrder = async (username, orderData) => {
    try {
        const profile = await profileModel.findOne({ username });
        if (!profile) {
            return 'Profile not found';
        }
        orderData.username = username;
        profile.orders.push(orderData);
        await profile.save();

        const updatedProfile = await profileModel.findOne({ username });
        return updatedProfile.orders[updatedProfile.orders.length - 1];
    } catch (error) {
        console.error('Error adding order:', error);
        return 'Failed to add order';
    }
}
module.exports.updateorder = async (username, orderId, updatedOrderData) => {
    try {
        const profile = await profileModel.findOne({ username });
        if (!profile) {
            return 'Profile not found';
        }
        if (!Array.isArray(profile.orders)) {
            profile.orders = [];
        }
        const orderIndex = profile.orders.findIndex(
            (order) => order._id.toString() === orderId
        );
        if (orderIndex === -1) {
            return ' Order not found';
        }
        if (orderIndex.toString() === ' ') {
            return 'Order not found';
        }
        Object.assign(profile.orders[orderIndex], updatedOrderData);
        await profile.save();
        // const updatedProfile = await profileModel.findOne({ username });
        return 'order updated successfully';
    } catch (error) {
        console.error('Error updating order:', error);
        return 'Failed to update order';
    }
}