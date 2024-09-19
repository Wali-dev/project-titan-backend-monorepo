const { body, query, validationResult } = require('express-validator');
const sendResponse = require('../utils/sendResponse');

const reviewSchema = [
    query("username")
        .notEmpty().withMessage("Username is mandatory")
        .isString().withMessage("Username must be a string "),
    query("orderId")
        .notEmpty().withMessage("orderId is mandatory")
        .isString().withMessage("orderId must be a string "),
    body("reviewerName")
        .notEmpty().withMessage("Reviewer name cannot be empty")
        .isString().withMessage("Reviewer name must be a string"),
    body("rating")
        .notEmpty().withMessage("Rating can not be empty")
        .isNumeric().withMessage("Rating must be a number"),
    body("reviewDescription")
        .isString().withMessage("Review description must be string")
];



const reviewValidator = [
    ...reviewSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];






module.exports = { reviewValidator };
