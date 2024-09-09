const express = require('express');
const { createOrder } = require('../controller/order.controller');
const router = express.Router();

router.post("/:username", createOrder)

module.exports = router;