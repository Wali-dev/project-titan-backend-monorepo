const express = require('express');
const { createReview } = require('../controller/review.controller');
const router = express.Router();

router.post('/', createReview);

module.exports = router;