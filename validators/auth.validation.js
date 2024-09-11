const { body, validationResult } = require('express-validator');
const sendResponse = require('../utils/sendResponse');

const authProfileSchema = [
    body("identifier")
        .notEmpty().withMessage("Username / email cannot be empty")
        .isString().withMessage("Username must be a string"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isString().withMessage("Password Incorrect")
];

const loginProfileValidator = [
    ...authProfileSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];

module.exports = { loginProfileValidator }