const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/user');
const usersHelper = require('./helperUsers');

// Run our backend under test
const api = supertest(app);

// Get predefined test users from usersHelper
const { TEST_PATIENT1, TEST_PATIENT2 } = usersHelper.testPatients;
const { TEST_DOCTOR1 } = usersHelper.testDoctors;
const nonHashedPassword = TEST_PATIENT1.password;

describe('OLD: REST API requests on /api/login (expects test users to be added)', () => {
  beforeEach(async () => {
    // Clean the test database first
    await User.deleteMany({});

    // Add the Test Users through Mongoose instead of API
    await new User(TEST_PATIENT1).save();
    await new User(TEST_DOCTOR1).save();
  });

  test('POST /api/login : TEST_PATIENT1 can login', async () => {
    const result = await api
      .post('/api/login/old')
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
      .post('/api/login/old')
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

describe('JWT Token: REST API requests on /api/login (expects test users to be added)', () => {
  beforeEach(async () => {
    // Clean the test database first
    await User.deleteMany({});
    TEST_PATIENT1.password = await bcrypt.hash(TEST_PATIENT1.password, 10);
    TEST_DOCTOR1.password = await bcrypt.hash(TEST_DOCTOR1.password, 10);
    // Add the Test Users through Mongoose instead of API
    await new User(TEST_PATIENT1).save();
    await new User(TEST_DOCTOR1).save();
  });

  test('POST /api/login : TEST_PATIENT1 can login', async () => {
    const result = await api
      .post('/api/login')
      .send({
        email: TEST_PATIENT1.email,
        password: nonHashedPassword,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const { body } = result;
    const userId = await usersHelper.getUserId(TEST_PATIENT1);

    const claim = { id: userId };
    const jtoken = jwt.sign(claim, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

    // Checking the response body
    expect(body.auth).toBe(true);
    expect(jtoken).toContain(jtoken);
    expect(body.profile.firstName).toContain(TEST_PATIENT1.firstName);
    expect(body.profile.role).toContain(TEST_PATIENT1.role);
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
    expect(body.message).toContain('Invalid Username or Password');
  });
});

// Close mongoose connection from supertest(app)
afterAll(() => {
  mongoose.connection.close();
});
