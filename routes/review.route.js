const express = require('express');
const { createReview } = require('../controller/review.controller');
const { reviewValidator } = require('../validators/review.validation');
const router = express.Router();

router.post('/', reviewValidator, createReview);

module.exports = router;