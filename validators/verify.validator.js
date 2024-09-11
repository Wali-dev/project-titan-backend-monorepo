const {query, param, validationResult } = require('express-validator');
const sendResponse = require('../utils/sendResponse');

const verificationEmailSchema = [
    param("username") //not working
        .notEmpty().withMessage("Username is required")  
        .isString().withMessage("Username must be a string"), 
];
const verifyAccountSchema = [
    query("username") //not working
        .notEmpty().withMessage("Username is required")                             
        .isString().withMessage("Username must be a string"), 
    query("verificationCode") //not working
        .notEmpty().withMessage("Username is required")  
        .isNumeric().withMessage("Verificationcode must be in Numbers")
];

const verificationEmailValidator = [
    ...verificationEmailSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, "error", "Validation failed", errors.array()[0].msg);
        }
        next();
    }
];
const verifyAccountValidator = [
    ...verifyAccountSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, "error", "Validation failed", errors.array()[0].msg);
        }
        next();
    }
];



module.exports={verificationEmailValidator,verifyAccountValidator}