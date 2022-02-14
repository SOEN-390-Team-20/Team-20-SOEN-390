const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const usersHelper = require('./helperUsers');

// Run our backend under test
const api = supertest(app);

// Get predefined test users from usersHelper
const { TEST_PATIENT1, TEST_PATIENT2 } = usersHelper.testPatients;
const { TEST_DOCTOR1 } = usersHelper.testDoctors;

describe('REST API requests on /api/users/ (expects test users to be added)', () => {
  beforeAll(async () => {
    // Clean the test database first
    await User.deleteMany({});

    // Add the Test Users through Mongoose instead of API
    await new User(TEST_PATIENT1).save();
    await new User(TEST_DOCTOR1).save();
  });

  test('POST /api/users : TEST_PATIENT2 can register', async () => {
    // Precondition: user should not already exist
    const isUserExist = await User.findOne({ email: TEST_PATIENT2.email });
    expect(isUserExist).toBeNull();

    // Register using the patient payload
    await api
      .post('/api/users')
      .send(TEST_PATIENT2)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    // Postcondition: user should exist in the mongodb database
    const addedUser = await User.findOne({ email: TEST_PATIENT2.email });
    expect(addedUser.email).toContain(TEST_PATIENT2.email);
  });

  test('PUT /api/users/:id : TEST_PATIENT2 can be updated', async () => {
    // Get the id
    const existingUser = await User.findOne({ email: TEST_PATIENT2.email });
    const { id } = existingUser;

    const updatedInfo = {
      email: TEST_PATIENT2.email,
      hin: TEST_PATIENT2.hin,
      password: TEST_PATIENT2.password,
      firstName: 'NewFirstName',
      lastName: 'NewLastName',
      role: TEST_PATIENT2.role,
      associated_users: [],
    };

    const result = await api
      .put(`/api/users/${id}`)
      .send(updatedInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const { body } = result;
    // Should not have changed
    expect(body.email).toContain(TEST_PATIENT2.email);
    expect(body.hin).toContain(TEST_PATIENT2.hin);
    expect(body.password).toContain(TEST_PATIENT2.password);
    expect(body.role).toContain(TEST_PATIENT2.role);
    // Should have changed
    expect(body.lastName).toContain(updatedInfo.lastName);
    expect(body.firstName).toContain(updatedInfo.firstName);
  });

  test('DELETE /api/users/:id : TEST_PATIENT2 can be deleted', async () => {
    // Get the id
    const existingUser = await User.findOne({ email: TEST_PATIENT2.email });
    const { id } = existingUser;

    await api
      .delete(`/api/users/${id}`)
      .expect(204);

    // Postcondition: user should not exist
    const deletedUser = await User.findOne({ email: TEST_PATIENT2.email });
    expect(deletedUser).toBeNull();
  });

  test('GET /api/users/:id : TEST_PATIENT1 can fetch their information', async () => {
    const existingUser = await User.findOne({ email: TEST_PATIENT1.email });
    const { id } = existingUser;

    const result = await api
      .get(`/api/users/${id}`)
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
});

// Close mongoose connection from supertest(app)
afterAll(() => {
  mongoose.connection.close();
});
