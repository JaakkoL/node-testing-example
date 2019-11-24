const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.use(bodyParser.json());

app.use('*', (req, res) => {
  res.send('OK');
});
app.use(errorHandler);

module.exports = app;
