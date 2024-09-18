const { body, validationResult } = require('express-validator');
const sendResponse = require('../utils/sendResponse');

const resetPasswordSchema = [
    body("password")
        .notEmpty().withMessage("Password is mandatory")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
        .isLength({ max: 12 }).withMessage("Password must be at most 12 characters long"),
];



const passwordValidator = [
    ...resetPasswordSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];






module.exports = { passwordValidator };
