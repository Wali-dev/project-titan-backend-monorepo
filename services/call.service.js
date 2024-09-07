const profileModel = require("../models/profile.model");

module.exports.addCall = async (username, callServiceData) => {
    try {
        const profile = await profileModel.findOne({ username });
        if (!profile) {
            return 'Profile not found';
        }
        profile.call1to1s.push(callServiceData);
        await profile.save();
        const updatedProfile = await profileModel.findOne({ username });
        return updatedProfile.call1to1s[updatedProfile.call1to1s.length - 1];
    } catch (error) {
        console.error('Error adding service:', error);
        return 'Failed to add call service service';
    }
}

module.exports.updateCalls = async (username, callserviceId, updatedCallData) => {
    try {
        const profile = await profileModel.findOne({ username });
        if (!profile) {
            return 'Profile not found';
        }
        if (!Array.isArray(profile.call1to1s)) {
            profile.call1to1s = [];
        }
        const callIndex = profile.call1to1s.findIndex(
            (call) => call._id.toString() === callserviceId
        );
        if (callIndex === -1) {
            return ' Call not found';
        }
        if (callIndex.toString() === ' ') {
            return 'Call not found';
        }
        Object.assign(profile.pMessages[callIndex], updatedCallData);
        await profile.save();
        // const updatedProfile = await profileModel.findOne({ username });
        return 'call updated successfully';
    } catch (error) {
        console.error('Error updating call:', error);
        return 'Failed to update call';
    }
};


