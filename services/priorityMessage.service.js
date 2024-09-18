const profileModel = require("../models/profile.model");
const PMessage = require("../models/priorityMessage.model");
const mongoose = require('mongoose');

module.exports.addPriorityMessages = async (username, pmServiceData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const profile = await profileModel.findOne({ username }).session(session);
        if (!profile) {
            await session.abortTransaction();
            session.endSession();
            return 'Profile not found';
        }

        const newPMessage = new PMessage(pmServiceData);
        await newPMessage.save({ session });

        if (!profile.pMessages) {
            profile.pMessages = [];
        }
        profile.pMessages.push(newPMessage._id);

        try {
            await profile.save({ session });
        } catch (validationError) {
            console.error('Validation error:', validationError);
            await session.abortTransaction();
            session.endSession();
            return 'Failed to add pMessage to profile';
        }

        await session.commitTransaction();
        session.endSession();

        return newPMessage;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error adding service:', error);
        return 'Failed to add priority message service';
    }
}


module.exports.updatePMessage = async (username, pmserviceId, updatedPMessageData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const profile = await profileModel.findOne({ username }).session(session);
        if (!profile) {
            await session.abortTransaction();
            session.endSession();
            return 'Profile not found';
        }

        if (!profile.pMessages) {
            await session.abortTransaction();
            session.endSession();
            return 'No pMessages found for this profile';
        }

        if (!profile.pMessages.includes(pmserviceId)) {
            await session.abortTransaction();
            session.endSession();
            return 'pMessage not found for this profile';
        }

        const updatedPMessage = await PMessage.findByIdAndUpdate(
            pmserviceId,
            updatedPMessageData,
            { new: true, session }
        );

        if (!updatedPMessage) {
            await session.abortTransaction();
            session.endSession();
            return 'pMessage not found';
        }

        await session.commitTransaction();
        session.endSession();

        return updatedPMessage;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error updating pMessage:', error);
        return 'Failed to update pMessage';
    }
};