const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderType: {
        type: String,
        required: true,
        enum: ['pMessage', '1to1Call', 'digitalProduct']
    },
    price: { type: String, required: true },
    username: { type: String, required: true },
    customerName: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: String },
    userConfirmed: { type: Boolean, default: false },
    customerConfirmed: { type: Boolean, default: false },
    isPaymentComplete: { type: Boolean, default: false },
    paymentId: { type: String },
    orderDate: { type: Date, required: true },
    pending: { type: Boolean, default: true },
    completed: { type: Boolean, default: false },
    emailReminderSent: { type: Boolean, default: false },
    phoneReminderSent: { type: Boolean, default: false },

    // Order Special Criteria

    // For Pm
    orderQuestion: { type: String },
    orderAnswer: { type: String },

    // For 1:1 Call
    inviteQuestions: { type: String }, //for pm also
    inviteQuestionAnswer: { type: String }, //for pm also
    callDuration: { type: String },
    callCustomLink: { type: String },

    // For Digital Product
    contentLink: { type: String },
    orderSentToCustomer: { type: Boolean, default: false },
    customOrderSentLink: { type: String },
});

const order = mongoose.model('Order', orderSchema);

module.exports = order;
