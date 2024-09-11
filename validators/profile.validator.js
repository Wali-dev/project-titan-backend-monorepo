const { param, body, validationResult } = require('express-validator');
const sendResponse = require('../utils/sendResponse');

const updateProfileSchema = [
    body("username")
        .notEmpty().withMessage("Username cannot be empty")
        .isString().withMessage("Username must be a string"),
    
    param("id")  // not working
        .notEmpty().withMessage("UserId is required")
        .isString().withMessage("UserId must be a string"),
];

const getSingleProfile = [
    param("username") //not working
        .notEmpty().withMessage("Username is required")
        .isString().withMessage("Username must be a string"),
];

const updateProfileValidator = [
    ...updateProfileSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, "error", "Validation failed", errors.array()[0].msg);
        }
        next();
    }
];

const getSingleProfileValidator = [
    ...getSingleProfile,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, "error", "Validation failed",errors.array()[0].msg);
        }
        next();
    }
];

module.exports = { updateProfileValidator, getSingleProfileValidator };
