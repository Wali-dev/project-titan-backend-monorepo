const express = require('express');
const { createOrder, updateOrder } = require('../controller/order.controller');
const { createOrderValidator, updateOrderValidator } = require('../validators/order.validator');
const router = express.Router();

router.post("/:username", createOrderValidator, createOrder)
router.patch("/", updateOrderValidator, updateOrder)

module.exports = router;