const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const User = require('../models/user');
const usersHelper = require('./helperUsers');
const jwt= require('jsonwebtoken');

// Run our backend under test
const api = supertest(app);

// Get predefined test users from usersHelper
const { TEST_PATIENT1, TEST_PATIENT2 } = usersHelper.testPatients;
const { TEST_DOCTOR1 } = usersHelper.testDoctors;
const nonHashedPassword = TEST_PATIENT1.password;
describe('REST API requests on /api/login (expects test users to be added)', () => {
  beforeAll(async () => {
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
    console.log(`${result}--------------------------------------------------------------------`);
    const { body } = result;
    console.log(result);
    var claim = {email:TEST_PATIENT1.email, role: TEST_PATIENT1.role}
    const jtoken = jwt.sign(claim, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
     expect(body).toContain(jtoken);
    
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
