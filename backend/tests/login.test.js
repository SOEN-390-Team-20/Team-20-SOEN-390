const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const usersHelper = require('./usersHelper');

// Run our backend under test
const api = supertest(app);

// Get predefined test users from usersHelper
const { TEST_PATIENT1, TEST_PATIENT2 } = usersHelper.testPatients;
const { TEST_DOCTOR1 } = usersHelper.testDoctors;

describe('REST API resquests on /api/login', () => {
  beforeAll(async () => {
    // Clean the test database first
    await User.deleteMany({});

    // Add the Test Users through Mongoose instead of API
    await new User(TEST_PATIENT1).save();
    const doctor1 = new User(TEST_DOCTOR1);

    await doctor1.save();
  });

  test('POST /api/login : TEST_PATIENT1 can login', async () => {
    const result = await api
      .post('/api/login')
      .send({
        email: TEST_PATIENT1.email,
        password: TEST_PATIENT1.password,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const { body } = result;
    expect(body.email).toContain(TEST_PATIENT1.email);
    expect(body.hin).toContain(TEST_PATIENT1.hin);
    expect(body.password).toContain(TEST_PATIENT1.password);
    expect(body.firstName).toContain(TEST_PATIENT1.firstName);
    expect(body.lastName).toContain(TEST_PATIENT1.lastName);
    expect(body.role).toContain(TEST_PATIENT1.role);
  });

  test('POST /api/login : TEST_PATIENT1 cannot login with bad credentials', async () => {
    const result = await api
      .post('/api/login')
      .send({
        email: TEST_PATIENT2.email,
        password: 'notlegit',
      })
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const { body } = result;
    expect(body.error).toContain('Invalid Username or Password');
  });
});

// Close mongoose connection from supertest(app)
afterAll(() => {
  mongoose.connection.close();
});
