const mongoose=require("mongoose");
const { Schema } = mongoose;
const profile = new Schema({
    username: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    intro: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false,
    },
    social: [String]
});
module.exports.profileModel = mongoose.model("Profile", profile);