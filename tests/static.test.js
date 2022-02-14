const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

// Run our backend under test
const api = supertest(app);

describe('Static routes tests', () => {
  test('GET / : accessible', async () => {
    await api
      .get('/')
      .expect(200);
  });
  test('GET /status : is accessible', async () => {
    await api
      .get('/status')
      .expect(200);
  });
});

// Close mongoose connection from supertest(app)
afterAll(() => {
  mongoose.connection.close();
});
