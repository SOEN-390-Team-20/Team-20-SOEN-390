const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const usersHelper = require('./helperUsers');

// Run our backend under test
const api = supertest(app);

const { TEST_PATIENT1 } = usersHelper.testPatients;

describe('(Old Api) REST API requests on /rest/api/', () => {
  beforeAll(async () => {
    // Clean the test database first
    await User.deleteMany({});
  });

  test('POST /rest/api/add-user : TEST_PATIENT1 can register', async () => {
    await api
      .post('/rest/api/add-user')
      // this is how to send a payload
      .send(TEST_PATIENT1)
      .expect(200);
  });

  test('POST /rest/api/login : TEST_PATIENT1 can login', async () => {
    // this test expects a test user already created (must be after registration)
    const result = await api
      .post('/rest/api/login')
      .send({
        email: TEST_PATIENT1.email,
        password: TEST_PATIENT1.password,
      })
      .expect(200);

    const body = result.body[0];

    expect(body.email).toContain(TEST_PATIENT1.email);
    expect(body.hin).toContain(TEST_PATIENT1.hin);
    expect(body.password).toContain(TEST_PATIENT1.password);
    expect(body.firstName).toContain(TEST_PATIENT1.firstName);
    expect(body.lastName).toContain(TEST_PATIENT1.lastName);
    expect(body.role).toContain(TEST_PATIENT1.role);
  });

  test('POST /rest/api/login : TEST_PATIENT1 cannot login with bad credentials', async () => {
    const result = await api
      .post('/rest/api/login')
      .send({
        email: TEST_PATIENT1.email,
        password: 'badcredentials',
      })
      .expect(200);

    expect(result.text).toContain('invalid');
  });
});

// Close mongoose connection from supertest(app)
afterAll(() => {
  mongoose.connection.close();
});
