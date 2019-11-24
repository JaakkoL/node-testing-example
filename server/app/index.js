const express = require('express');
const bodyParser = require('body-parser');
const publicRoute = require('./routes/public');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.use(bodyParser.json());

app.use('/api', publicRoute);
app.use(errorHandler);

module.exports = app;
