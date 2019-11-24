const basicAuth = require('express-basic-auth');
const config = require('../config');

const user = config.authUser;
const password = config.authPassword;

module.exports = basicAuth({
  users: { [user]: password }
});
