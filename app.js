const express = require('express')
const app = express()
const cors = require('cors');
const router = require('./routes/index')

//Middlewares
app.use(cors())


//Routers
app.use("/api/v1/", router);


app.get('/', (req, res) => {
    res.send("Groove streets, home!")
})



module.exports = app;