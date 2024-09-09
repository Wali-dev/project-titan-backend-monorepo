const express = require('express');
const { createOrder, updateOrder } = require('../controller/order.controller');
const router = express.Router();

router.post("/:username", createOrder)
router.patch("/", updateOrder)

module.exports = router;