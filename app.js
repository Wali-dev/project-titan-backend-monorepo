const express = require('express')
const app = express()
const cors = require('cors');
const router = require('./routes/index')

//Middlewares
app.use(cors())


//Routers
app.use("/", router);


app.get('/', (req, res) => {
    res.send("Groove streets, home!")
})

//default error

module.exports = app;