const mongoose = require("mongoose");
const { Schema } = mongoose;
const pMessage = require('./priorityMessage.model');
const call1to1 = require("./1to1Call.model");
const documentService = require("./digitalDocument.model");
const order = require("./order.model");

const profileSchema = new Schema({
    username: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        required: false
    },
    intro: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    social: {
        type: [{
            platform: String,
            url: String
        }],
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
    },
    verificationCodeExpire: {
        type: Date,
    },
    pMessages: { type: [pMessage.schema], default: [] },
    call1to1s: { type: [call1to1.schema], default: [] },
    documentServices: { type: [documentService.schema], default: [] },

    //Orders
    orders: { type: [order.schema], default: [] }

});

module.exports = mongoose.model("Profile", profileSchema);