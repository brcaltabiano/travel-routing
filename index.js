const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();

app.use(bodyParser.json({ limit: '1024mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1024mb' }));
app.use(indexRouter);

module.exports = app;
