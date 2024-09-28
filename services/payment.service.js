
const Order = require("../models/order.model");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports.pay = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return "Order not found for payment"
        }
        const storeItems = [{
            price_data: {
                currency: "usd",
                product_data: {
                    name: order.orderType
                },
                unit_amount: order.price * 100
            },
            quantity: 1
        }
        ];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: storeItems,
            success_url: `${process.env.SERVER_URL}/payment/paymentsuccess/${order._id}`,
            cancel_url: `${process.env.SERVER_URL}/payment/cancelpayment/${order._id}`
        });

        return session.url;
    } catch (error) {
        console.log(error);
        return "Creating checkout failed"
    }
};


module.exports.paymentComplete = async (orderId) => {
    try {
        const order = await Order.findById({ orderId })
        if (!order) {
            return "Order not found for payment complete"
        }
        await Order.findByIdAndUpdate(orderId, { isPaymentComplete: true })

        return "Payment successful"

    } catch (error) {
        console.log(error)
        return "Payment complete verification failed"
    }
}
module.exports.paymentIncomplete = async (orderId) => {
    try {
        const order = await Order.findById({ orderId })
        if (!order) {
            return "Order not found for order delete"
        }
        await Order.findByIdAndDelete(orderId)
        return "Order deleted succesfully due to not completing payment"
    } catch (error) {
        console.log(error)
        return "Order deletetation failed"
    }
}
