module.exports = {
  authUser: process.env.AUTH_USER || 'api',
  authPassword: process.env.AUTH_PASSWORD || '7fiPsCaa2wTRaREDyfDWNuLeECgZue4TndBvsQo8iTRsoyFQULLTfjAdxbkMWyfj',
  port: parseInt(process.env.PORT, 10) || 8080
};
