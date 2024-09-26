// const sendResponse = require("../utils/sendResponse");
// const documentModel = require("../models/digitalDocument.model");
// const onetooneModel = require("../models/1to1Call.model");
// const pmModel = require("../models/priorityMessage.model");
// const orderModel = require("../models/order.model");
// require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET);

// const pay = async (lineItems) => {
//     try {
//         if (lineItems) {
//             const storeItems = await Promise.all(
//                 lineItems.map(async (item) => {
//                     if (item.type === '1to1call') {
//                         const tempItem = await onetooneModel.findById(item.id);
//                     }
//                     if (item.type === 'digitaldocument') {
//                         const tempItem = await documentModel.findById(item.id);
//                     }
//                     if (item.type === 'prioritymessage') {
//                         const tempItem = await pmModel.findById(item.id);
//                     }
//                     const basePrice = Math.round(parseFloat(tempItem.price) * 100);
//                     if (item.isToggle === "on") {
//                         const itemPrice=Math.round(parseFloat(item.price) * 100);
//                         if (itemPrice > basePrice) {
//                             const newOrder = await orderModel.create({ title: tempItem.title, price: item.price, username: tempItem.username, customerEmail: tempItem.email, customerPhone: tempItem.phone });
//                         }
//                         else {
//                             return "Given price is less than the base price";
//                         }
//                     }
//                     else {
//                         const newOrder = await orderModel.create({ title: tempItem.title, price: item.price, username: tempItem.username, customerEmail: tempItem.email, customerPhone: tempItem.phone });
//                     }
//                     // const priceInCents = Math.round(parseFloat(newOrder.price) * 100);
//                     return {
//                         price_data: {
//                             currency: 'usd',
//                             product_data: {
//                                 name: storeItem.title,
//                             },
//                             unit_amount: priceInCents,
//                         },
//                         quantity: 1,
//                     };
//                 })
//             );
//             const id = newOrder._id;
//             const session = await stripe.checkout.sessions.create({
//                 payment_method_types: ['card'],
//                 mode: 'payment',
//                 line_items: storeItems,
//                 success_url: `${process.env.SERVER_URL}/paymentsuccess/${id}`,
//                 cancel_url: `${process.env.SERVER_URL}/cancelpayment/${id}`
//             });

//             return session.url;
//         } else {
//             return 'Fill all the details carefully';
//         }
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// };

// module.exports = { pay };

const sendResponse = require("../utils/sendResponse");
const documentModel = require("../models/digitalDocument.model");
const onetooneModel = require("../models/1to1Call.model");
const pmModel = require("../models/priorityMessage.model");
const orderModel = require("../models/order.model");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const pay = async (lineItems) => {
    try {
        if (!lineItems || lineItems.length === 0) {
            return 'line items are not there';
        }

        let newOrder;
        const storeItems = await Promise.all(
            lineItems.map(async (item) => {
                let tempItem;
                if (item.type === '1to1Call') {
                    tempItem = await onetooneModel.findById(item.id);
                } else if (item.type === 'digitalProduct') {
                    tempItem = await documentModel.findById(item.id);
                } else if (item.type === 'pMessage') {
                    tempItem = await pmModel.findById(item.id);
                }

                if (!tempItem) {
                    // throw new Error('Item not found');
                    return 'item not found';
                }
                // console.log('tempItem:', tempItem); // Check if `username` exists in `tempItem`

                const basePrice = Math.round(parseFloat(tempItem.price) * 100);
                const itemPrice = Math.round(parseFloat(item.price) * 100);

                if (item.isToggle === "on" && itemPrice < basePrice) {
                    // throw new Error('Given price is less than the base price');
                    return 'given price is less than base price'
                }

                newOrder = await orderModel.create({
                    orderType:item.type,
                    title: tempItem.title,
                    price: item.price,
                    username: item.username,
                    customerEmail: tempItem.email,
                    customerPhone: tempItem.phone,
                    orderDate:new Date()
                });

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: tempItem.title,
                        },
                        unit_amount: itemPrice,
                    },
                    quantity: 1,
                };
            })
        );

        if (!newOrder || !newOrder._id) {
            return 'Order was not created successfully';
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: storeItems,
            success_url: `${process.env.SERVER_URL}/paymentsuccess/${newOrder._id}`,
            cancel_url: `${process.env.SERVER_URL}/cancelpayment/${newOrder._id}`
        });

        return session.url;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {pay};