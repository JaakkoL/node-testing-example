module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { id, ip, method, originalUrl } = req;
  console.error(`${id} ${ip} ${method} ${originalUrl} - Unhandled error:`, err);
  res.sendStatus(500);
};
