const { StatusCodeError } = require('request-promise/errors');

module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { id, ip, method, originalUrl } = req;
  if (err instanceof StatusCodeError) {
    const { statusCode } = err;
    console.error(`${id} ${ip} ${method} ${originalUrl} - StatusCodeError`, err.message);
    res.sendStatus(statusCode);
  } else {
    console.error(`${id} ${ip} ${method} ${originalUrl} - Unhandled error:`, err.message);
    res.sendStatus(500);
  }
};
