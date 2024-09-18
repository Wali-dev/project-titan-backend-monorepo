const express = require('express')
const app = express()
const cors = require('cors');
const router = require('./routes/index');
const { database } = require('./config/database');
//const profileModel = require('./models/profile.model');
const cookieParser = require('cookie-parser');

//Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Database connect
database();
//profileModel.collection.drop();

//Routers
app.use("/api/v1/", router);

app.get('/', (req, res) => {
    res.send("Groove streets, home!")
})

module.exports = app;
