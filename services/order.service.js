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