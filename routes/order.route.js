const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
    res.send("this is the order route")
})

module.exports = router;