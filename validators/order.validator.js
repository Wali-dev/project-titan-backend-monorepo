const { query,param,body, validationResult } = require('express-validator');
const sendResponse = require('../utils/sendResponse');

const createOrderValidationSchema = [
    param("username")
        .notEmpty().withMessage("Username is mandatory")
        .isString().withMessage("Username must be a string "),
    body("orderType")
        .notEmpty().withMessage("Title cannot be empty")
        .isString().withMessage("Title must be a string"),
];
const updateOrderValidationSchema = [
    query("username")
        .notEmpty().withMessage("Username is mandatory")
        .isString().withMessage("Username must be a string "),
    query("orderId")
        .notEmpty().withMessage("orderId is mandatory")
        .isString().withMessage("orderId must be a string "),
    body("orderType")
        .notEmpty().withMessage("Order type cannot be empty")
        .isString().withMessage("Order type must be a string"),
    body("customerEmail")
        .notEmpty().withMessage("Email cannot be empty")
        .isEmail().withMessage("Invalid email address"),
];

const createOrderValidator = [
    ...createOrderValidationSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];
const updateOrderValidator = [
    ...updateOrderValidationSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];

module.exports={createOrderValidator,updateOrderValidator};