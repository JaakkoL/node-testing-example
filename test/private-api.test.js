const { describe, afterEach, it } = require('mocha');
const request = require('supertest');
const nock = require('nock');

const app = require('../server/app');
const config = require('../server/app/config');

describe('/private-api', () => {
  describe('GET /', () => {
    it('should require authentication', async () => {
      await request(app)
        .get('/private-api')
        .expect(401); // Test that endpoint is inaccesible without valid credentials.
    });

    it('should respond with 200 for authenticated requests', async () => {
      await request(app)
        .get('/private-api')
        .auth(config.authUser, config.authPassword) // Pass basic auth credentials with request.
        .expect(200, { success: true });
    });
  });

  describe('GET /:user', async () => {
    afterEach(() => nock.cleanAll());

    it('should require authentication', async () => {
      await request(app)
        .get('/private-api/JaakkoL')
        .expect(401);
    });

    it('should respond with 200 for authenticated requests', async () => {
      const responseBody = [{
        id: 222696462,
        name: 'knex-migrations-example',
        full_name: 'JaakkoL/knex-migrations-example',
        private: false
      }, {
        id: 223765639,
        name: 'node-testing-example',
        full_name: 'JaakkoL/node-testing-example',
        private: false
      }];

      nock('https://api.github.com')
        .get('/users/JaakkoL/repos')
        .reply(200, responseBody);

      await request(app)
        .get('/private-api/JaakkoL')
        .auth(config.authUser, config.authPassword)
        .expect(200, responseBody);
    });

    it('should handle failed requests', async () => {
      nock('https://api.github.com')
        .get('/users/JaakkoL/repos')
        .reply(404);

      await request(app)
        .get('/private-api/JaakkoL')
        .auth(config.authUser, config.authPassword)
        .expect(404);
    });
  });
});
