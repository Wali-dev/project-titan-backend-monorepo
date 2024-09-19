const sendResponse = require("../utils/sendResponse");
const documentModel = require("../models/digitalDocument.model");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const pay = async (lineItems) => {
    try {
        if (lineItems) {
            const storeItems = await Promise.all(
                lineItems.map(async (item) => {
                    const storeItem = await documentModel.findById(item.id);
                    const priceInCents = Math.round(parseFloat(storeItem.price) * 100); 

                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: storeItem.title,
                            },
                            unit_amount: priceInCents, 
                        },
                        quantity: item.quantity,
                    };
                })
            );

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: storeItems,  
                success_url: `${process.env.SERVER_URL}/paymentsuccess`,
                cancel_url: `${process.env.SERVER_URL}/cancelpayment`
            });

            return session.url;
        } else {
            return 'Fill all the details carefully';
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = { pay };
