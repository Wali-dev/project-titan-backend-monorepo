const { query,param,body, validationResult } = require('express-validator');
const sendResponse = require('../utils/sendResponse');
const createServiceValidationSchema = [
    param("username")
        .notEmpty().withMessage("Username is mandatory")
        .isString().withMessage("Username must be a string "),
    body("title")
        .notEmpty().withMessage("Title cannot be empty")
        .isString().withMessage("Title must be a string"),
    body("price")
        .notEmpty().withMessage("Price cannot be empty")
        .isString().withMessage("Price must be a string"),
    // body("longDescription")
    //     .isString().withMessage("Field must be a string"),
    // body('promisedResponseTime')
    //     .isString().withMessage('Response time must be a string')
    //     .isIn(['1 day', '2 days', '3 days', '1 week', 'nolimit']).withMessage('Invalid response time'),
    // // body('isActive')
    // //     .notEmpty().withMessage("Field cannot be empty")
    // //     .isBoolean().withMessage('Either yes or no'),
    // body('isDeleted')
    //     .isBoolean().withMessage('Response time must be a string'),
    // body('totalViews')
    //     .isString().withMessage('Total views must be a string'),
    // body('totalEarnings')
    //     .isString().withMessage('Total Earning must be a string'),
    // body('conversing')
    //     .isString().withMessage('Conversion must be a string'),
        
];

const updateServiceValidationSchema = [
    query("username")
        .notEmpty().withMessage("Username is required")
        .isString().withMessage("Username must be a string"),
    query("pmserviceId")
        .notEmpty().withMessage("Service Id is required")
        .isString().withMessage("Verificationcode must string"),
    body("totalBookings")
        .isString().withMessage("Total bookings is required")
        .notEmpty().withMessage("Total bookings cannot be empty"),
];
// const createCallPMSchema = [
//     param("username")
//         .notEmpty().withMessage("Username is required")
//         .isString().withMessage("Username must be a string"),
//     body("title")
//         .isString().withMessage("Total bookings is required")
//         .notEmpty().withMessage("Total bookings cannot be empty"),
//     body("price")
//         .isString().withMessage("Total bookings is required")
//         .notEmpty().withMessage("Total bookings cannot be empty"),
// ];

// const updateCallSchema = [
//     query("username")
//         .notEmpty().withMessage("Username is required")
//         .isString().withMessage("Username must be a string"),
//     query("pmserviceId")
//         .notEmpty().withMessage("Service Id is required")
//         .isString().withMessage("Verificationcode must string"),
//     body("totalBookings")
//         .isString().withMessage("Total bookings is required")
//         .notEmpty().withMessage("Total bookings cannot be empty"),
// ];
// const createDocumentSchema = [
//     param("username")
//         .notEmpty().withMessage("Username is required")
//         .isString().withMessage("Username must be a string"),
//     body("title")
//         .isString().withMessage("Total bookings is required")
//         .notEmpty().withMessage("Total bookings cannot be empty"),
//     body("price")
//         .isString().withMessage("Total bookings is required")
//         .notEmpty().withMessage("Total bookings cannot be empty"),
// ];
// const updateDocumentSchema = [
//     query("username")
//         .notEmpty().withMessage("Username is required")
//         .isString().withMessage("Username must be a string"),
//     query("pmserviceId")
//         .notEmpty().withMessage("Service Id is required")
//         .isString().withMessage("Verificationcode must string"),
//     body("totalBookings")
//         .isString().withMessage("Total bookings is required")
//         .notEmpty().withMessage("Total bookings cannot be empty"),
// ];

const createServiceValidator = [
    ...createServiceValidationSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];
const updateServiceValidator = [
    ...updateServiceValidationSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];
// const createCallServiceValidator = [
//     ...createCallPMSchema,
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return sendResponse(res, 400, false, errors.array()[0].msg);
//         }
//         next();
//     }
// ];
// const updatecallServiceValidator = [
//     ...updateCallSchema,
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return sendResponse(res, 400, false, errors.array()[0].msg);
//         }
//         next();
//     }
// ];
// const createDocumentServiceValidator = [
//     ...createDocumentSchema,
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return sendResponse(res, 400, false, errors.array()[0].msg);
//         }
//         next();
//     }
// ];
// const updateDocumentServiceValidator = [
//     ...updateDocumentSchema,
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return sendResponse(res, 400, false, errors.array()[0].msg);
//         }
//         next();
//     }
// ];

module.exports={createServiceValidator,updateServiceValidator};