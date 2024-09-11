const { body, validationResult } = require('express-validator');
const sendResponse = require('../utils/sendResponse');
const createuserValidationSchema = [
    body("email")
        .notEmpty().withMessage("Email is mandatory")
        .isEmail().withMessage("Invalid email address"),

    body("firstname")
        .notEmpty().withMessage("First name is mandatory")
        .isString().withMessage("First name must be a string"),
    body("lastname")
        .optional()
        .isString().withMessage("Last name must be a string"),

    body("password")
        .notEmpty().withMessage("Password is mandatory")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
        .isLength({ max: 12 }).withMessage("Password must be at most 12 characters long"),
];

const isEmailvalidationSchema = [
    body("email")
        .isEmail().withMessage("Enter a valid email")
        .notEmpty().withMessage("Email could not be empty")
]
const isUsernamevalidationSchema = [
    body("username")
        .isString().withMessage("Enter a valid username")
        .notEmpty().withMessage("Username can not be empty")
]


const createuserValidator = [
    ...createuserValidationSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];
const isEmailAvailableValidator = [
    ...isEmailvalidationSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];
const isUsernameAvailableValidator = [
    ...isUsernamevalidationSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];





module.exports = { createuserValidator, isEmailAvailableValidator, isUsernameAvailableValidator };
