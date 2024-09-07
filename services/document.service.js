const profileModel = require("../models/profile.model");

module.exports.addDocument = async (username, documentServiceData) => {
    try {
        const profile = await profileModel.findOne({ username });
        if (!profile) {
            return 'Profile not found';
        }
        profile.documentServices.push(documentServiceData);
        await profile.save();
        const updatedProfile = await profileModel.findOne({ username });
        return updatedProfile.documentServices[updatedProfile.documentServices.length - 1];
    } catch (error) {
        console.error('Error adding service:', error);
        return 'Failed to add document service';
    }
}

module.exports.updateDocuments = async (username, documentserviceId, updatedDocumentData) => {
    try {
        const profile = await profileModel.findOne({ username });
        if (!profile) {
            return 'Profile not found';
        }
        if (!Array.isArray(profile.documentServices)) {
            profile.documentServices = [];
        }
        const documentIndex = profile.documentServices.findIndex(
            (docu) => docu._id.toString() === documentserviceId
        );
        console.log(documentIndex)
        if (documentIndex === -1) {
            return 'Document not found1';
        }
        if (documentIndex.toString() === ' ') {
            return 'Document not found';
        }
        Object.assign(profile.documentServices[documentIndex], updatedDocumentData);
        await profile.save();
        //  const updatedProfile = await profileModel.findOne({ username });
        return 'Document updated successfully';
    } catch (error) {
        console.error('Error updating document:', error);
        return 'Failed to update document';
    }
};


