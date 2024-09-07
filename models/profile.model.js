const mongoose = require("mongoose");
const { Schema } = mongoose;
const pMessage = require('./priorityMessage.model')

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
        type: [String],
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

});

module.exports = mongoose.model("Profile", profileSchema);