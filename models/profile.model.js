const mongoose = require('mongoose');
const { Schema } = mongoose;

// Import related models
const Call1to1 = require('./1to1Call.model');
const DocumentService = require('./digitalDocument.model');
const Order = require('./order.model');
const PMessage = require('./priorityMessage.model');

const profileSchema = new Schema({
    username: {
        type: String,
        sparse: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true
    },
    firstname: {
        type: String,
        required: true,
        lowercase: true
    },
    lastname: {
        type: String,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    intro: {
        type: String
    },
    phone: {
        type: String,
        sparse: true,
        index: true
    },
    description: {
        type: String
    },
    social: [{
        platform: String,
        url: String
    }],
    isDeleted: {
        type: Boolean,
        default: false,
        index: true
    },
    isVerified: {
        type: Boolean,
        default: false,
        index: true
    },
    verificationCode: {
        type: String
    },
    verificationCodeExpire: {
        type: Date
    },

    // References to related models
    pMessages: [{
        type: Schema.Types.ObjectId,
        ref: 'PMessage'
    }],
    call1to1s: [{
        type: Schema.Types.ObjectId,
        ref: 'Call1to1'
    }],
    documentServices: [{
        type: Schema.Types.ObjectId,
        ref: 'DocumentService'
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }]
}, {
    timestamps: true
});

// Compound index for common query patterns
profileSchema.index({ isDeleted: 1, isVerified: 1 });

module.exports = mongoose.model("Profile", profileSchema);