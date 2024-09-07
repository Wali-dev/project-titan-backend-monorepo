const profileModel = require("../models/profile.model");

module.exports.addPriorityMessages = async (username, pmServiceData) => {
    try {
        const profile = await profileModel.findOne({ username });
        if (!profile) {
            return 'Profile not found';
        }
        profile.pMessages.push(pmServiceData);
        await profile.save();
        const updatedProfile = await profileModel.findOne({ username });
        return updatedProfile.pMessages[updatedProfile.pMessages.length - 1];
    } catch (error) {
        console.error('Error adding service:', error);
        return 'Failed to add priority message service';
    }
}

module.exports.updatePMessage = async (username, pmserviceId, updatedPMessageData) => {
    try {
        const profile = await profileModel.findOne({ username });
        if (!profile) {
            return 'Profile not found';
        }
        if (!Array.isArray(profile.pMessages)) {
            profile.pMessages = [];
        }
        const pMessageIndex = profile.pMessages.findIndex(
            (message) => message._id.toString() === pmserviceId
        );

        if (pMessageIndex === -1) {
            return 'pMessage not found';
        }
        if (!pMessageIndex) {
            return 'pMessage not found';
        }
        Object.assign(profile.pMessages[pMessageIndex], updatedPMessageData);
        await profile.save();
        const updatedProfile = await profileModel.findOne({ username });
        return 'pMessage updated successfully';
    } catch (error) {
        console.error('Error updating pMessage:', error);
        return 'Failed to update pMessage';
    }
};


