const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./src/routers/index');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/ping', (req, res) => {
    res.status(200).json({
        message: 'app is running...',
    });
});

app.use('/api/v1/', routes);

// app.use(error.handler);

module.exports = app;