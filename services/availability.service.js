const mongoose = require('mongoose');
const profileModel = require('../models/profile.model');
const Availability = require('../models/availability.model');

module.exports.createAvailability = async (username, availabilityData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const profile = await profileModel.findOne({ username }).session(session);
        if (!profile) {
            throw new Error('Profile not found');
        }

        const newAvailability = new Availability(availabilityData);
        await newAvailability.save({ session });

        profile.availabilities.push(newAvailability._id);
        await profile.save({ session });

        await session.commitTransaction();
        return newAvailability;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

module.exports.updateavailability = async (username, availabilityId, updatedData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const profile = await profileModel.findOne({ username }).session(session);
        if (!profile) {
            throw new Error('Profile not found');
        }

        if (!profile.availabilities.includes(availabilityId)) {
            throw new Error('Availability not found for this profile');
        }

        const availability = await Availability.findByIdAndUpdate(
            availabilityId,
            updatedData,
            { new: true, runValidators: true, session }
        );

        if (!availability) {
            throw new Error('Availability not found');
        }

        await session.commitTransaction();
        return availability;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

module.exports.getAvailability = async (username, availabilityId) => {
    const profile = await profileModel.findOne({ username });
    if (!profile) {
        throw new Error('Profile not found');
    }

    if (!profile.availabilities.includes(availabilityId)) {
        throw new Error('Availability not found for this profile');
    }

    const availability = await Availability.findById(availabilityId);
    if (!availability) {
        throw new Error('Availability not found');
    }

    return availability;
}

module.exports.getAllAvailabilities = async (username) => {
    const profile = await profileModel.findOne({ username }).populate('availabilities');
    if (!profile) {
        throw new Error('Profile not found');
    }

    return profile.availabilities;
}
