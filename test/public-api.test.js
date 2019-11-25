const { describe, afterEach, it } = require('mocha');
const request = require('supertest');
const nock = require('nock');

const app = require('../server/app');

describe('/api', () => {
  describe('GET /', () => { // Test one endpoint at a time.
    it('should respond with 200 for successful requests', async () => {
      await request(app) // Send request to application.
        .get('/api')
        .expect(200, { success: true }); // Assert response code and body.
    });
  });

  describe('GET /:user', async () => {
    afterEach(() => nock.cleanAll()); // Clear any pending request mocks.

    it('should respond with 200 for successful requests', async () => {
      const responseBody = {
        login: 'JaakkoL',
        id: 3208287,
        avatar_url: 'https://avatars2.githubusercontent.com/u/3208287?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/JaakkoL',
        type: 'User',
        name: 'Jaakko Laurila'
      };

      nock('https://api.github.com')
        .get('/users/JaakkoL')
        .reply(200, responseBody); // Mock outside resources, status code and response body.

      await request(app)
        .get('/api/JaakkoL')
        .expect(200, responseBody);
    });

    it('should handle failed requests', async () => {
      nock('https://api.github.com')
        .get('/users/JaakkoL')
        .reply(404);

      await request(app)
        .get('/api/JaakkoL')
        .expect(404);
    });
  });
});
