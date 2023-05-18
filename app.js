require("dotenv").config()
// const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();

//middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
    console.log("<BODY LOGGER START", req.body, "<BODY LOGGER END");
    next();
});

const apiRouter = require('./api');
app.use('/api', apiRouter);

app.use('*', (req, res, next) => {
    res.status(404);
    res.send({error: 'route not found'})
});

app.use((error, req, res, next) => {
    res.status(500);
    res.json(error)
});

module.exports = app;