const profileModel = require("../models/profile.model");
const DocumentService = require("../models/digitalDocument.model");
const mongoose = require('mongoose');

module.exports.addDocument = async (username, documentServiceData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const profile = await profileModel.findOne({ username }).session(session);
        if (!profile) {
            await session.abortTransaction();
            session.endSession();
            return 'Profile not found';
        }

        const newDocument = new DocumentService(documentServiceData);
        await newDocument.save({ session });

        if (!profile.documentServices) {
            profile.documentServices = [];
        }
        profile.documentServices.push(newDocument._id);

        try {
            await profile.save({ session });
        } catch (validationError) {
            console.error('Validation error:', validationError);
            await session.abortTransaction();
            session.endSession();
            return 'Failed to add document service to profile';
        }

        await session.commitTransaction();
        session.endSession();

        return newDocument;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error adding document service:', error);
        return 'Failed to add document service';
    }
}

module.exports.updateDocuments = async (username, documentserviceId, updatedDocumentData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const profile = await profileModel.findOne({ username }).session(session);
        if (!profile) {
            await session.abortTransaction();
            session.endSession();
            return 'Profile not found';
        }

        const updatedDocument = await DocumentService.findByIdAndUpdate(
            documentserviceId,
            updatedDocumentData,
            { new: true, session }
        );

        if (!updatedDocument) {
            await session.abortTransaction();
            session.endSession();
            return 'Document not found';
        }

        if (!profile.documentServices) {
            profile.documentServices = [];
        }
        if (!profile.documentServices.includes(documentserviceId)) {
            profile.documentServices.push(documentserviceId);
            await profile.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        return updatedDocument;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error updating document:', error);
        return 'Failed to update document';
    }
};