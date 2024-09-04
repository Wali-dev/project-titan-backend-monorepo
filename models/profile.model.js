const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    }
});

module.exports = mongoose.model("Profile", profileSchema);