const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = require("../models/order.model");

const reviewSchema = new Schema({
    username: { type: String, required: true },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    reviewerName: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewDescription: { type: String },
},
    {
        timestamps: { createdAt: true, updatedAt: false }

    }
);

const review = mongoose.model('Reviews', reviewSchema);

module.exports = review;
