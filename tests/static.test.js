const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

// Run our backend under test
const api = supertest(app);

describe('Static routes tests', () => {
  test('GET / : React app is accessible', async () => {
    await api
      .get('/')
      .expect(200);
  });
  test('GET /health : is accessible', async () => {
    await api
      .get('/health')
      .expect(200);
  });
  test('GET /version: is accessible', async () => {
    await api
      .get('/version')
      .expect(200);
  });
});

// Close mongoose connection from supertest(app)
afterAll(() => {
  mongoose.connection.close();
});
