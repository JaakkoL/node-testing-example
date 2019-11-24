const express = require('express');
const bodyParser = require('body-parser');
const privateRoute = require('./routes/private');
const publicRoute = require('./routes/public');
const basicAuth = require('./middleware/basic-auth');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.use(bodyParser.json());

app.use('/api', publicRoute);
app.use('/private-api', basicAuth, privateRoute);

app.use(errorHandler);

module.exports = app;
