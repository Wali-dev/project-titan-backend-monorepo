const profileModel = require("../models/profile.model");
const Call1to1 = require("../models/1to1Call.model");
const mongoose = require('mongoose');

module.exports.addCallService = async (username, callServiceData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const profile = await profileModel.findOne({ username }).session(session);
        if (!profile) {
            await session.abortTransaction();
            session.endSession();
            return 'Profile not found';
        }

        const newCallService = new Call1to1(callServiceData);
        await newCallService.save({ session });

        if (!profile.callServices) {
            profile.callServices = [];
        }
        profile.callServices.push(newCallService._id);

        try {
            await profile.save({ session });
        } catch (validationError) {
            console.error('Validation error:', validationError);
            await session.abortTransaction();
            session.endSession();
            return 'Failed to add call service to profile';
        }

        await session.commitTransaction();
        session.endSession();

        return newCallService;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error adding call service:', error);
        return 'Failed to add call service';
    }
}

module.exports.updateCallService = async (username, callserviceId, updatedCallData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const profile = await profileModel.findOne({ username }).session(session);
        if (!profile) {
            await session.abortTransaction();
            session.endSession();
            return 'Profile not found';
        }

        if (!profile.call1to1s) {
            await session.abortTransaction();
            session.endSession();
            return 'No call services found for this profile';
        }

        // if (!profile.call1to1s.includes(callserviceId)) {
        //     await session.abortTransaction();
        //     session.endSession();
        //     return 'Call service not found for this profile';
        // }

        const updatedCallService = await Call1to1.findByIdAndUpdate(
            callserviceId,
            updatedCallData,
            { new: true, session }
        );

        if (!updatedCallService) {
            await session.abortTransaction();
            session.endSession();
            return 'Call service not found';
        }

        await session.commitTransaction();
        session.endSession();

        return updatedCallService;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error updating call service:', error);
        return 'Failed to update call service';
    }
};
