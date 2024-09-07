const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const callSchema = new Schema({
    title: { type: String, required: true },
    callDuration: { type: String },
    price: { type: String, required: true },
    shortDescription: { type: String },
    longDescription: { type: String },
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

const call1to1 = mongoose.model('call1to1', callSchema);

module.exports = call1to1;
