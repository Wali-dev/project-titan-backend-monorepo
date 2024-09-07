const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pmSchema = new Schema({
    title: { type: String },
    price: { type: String },
    shortDescription: { type: String },
    longDescription: { type: String },
    promisedResponseTime: {
        type: String,
        enum: ['1 day', '2 days', '3 days', '1 week', 'nolimit'],
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    totalViews: { type: String },
    totalBookings: { type: String },
    totalEarnings: { type: String },
    conversing: { type: String }
});

const pMessage = mongoose.model('pMessage', pmSchema);

module.exports = pMessage;
