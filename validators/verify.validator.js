const { query, param, validationResult } = require('express-validator');
const sendResponse = require('../utils/sendResponse');

const verificationEmailSchema = [
    param("username")
        .notEmpty().withMessage("Username is required")
        .isString().withMessage("Username must be a string"),
];
const verifyAccountSchema = [
    query("username")
        .notEmpty().withMessage("Username is required")
        .isString().withMessage("Username must be a string"),
    query("verificationCode")
        .notEmpty().withMessage("Verification code is required")
        .isString().withMessage("Verificationcode must be string")
];

const verificationEmailValidator = [
    ...verificationEmailSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];
const verifyAccountValidator = [
    ...verifyAccountSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];



module.exports = { verificationEmailValidator, verifyAccountValidator }