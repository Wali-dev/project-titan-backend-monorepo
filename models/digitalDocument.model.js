const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    shortDescription: { type: String },
    longDescription: { type: String },
    contentLink: { type: String },
    coverLink: { type: String },
    thumbnailLink: { type: String },
    instructions: { type: String },
    inviteQuestions: [
        {
            quest: { type: String },
            required: { type: Boolean, default: false },
            answerType: { type: String, enum: ['text', 'file'] }
        }
    ],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    totalViews: { type: String },
    totalBookings: { type: String },
    totalEarnings: { type: String },
    conversing: { type: String }
});

const documentService = mongoose.model('documentSchema', documentSchema);

module.exports = documentService;
