const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const User = require('../models/user');
const Conversation = require('../models/conversation');
const usersHelper = require('./helperUsers');

// Run our backend under test
const api = supertest(app);

// Get predefined test users from usersHelper
const { TEST_PATIENT1 } = usersHelper.testPatients;
const { TEST_DOCTOR1 } = usersHelper.testDoctors;
const nonHashedPassword = TEST_PATIENT1.password;

describe('Chat: REST API requests on /api/conversations (expects chat message to be recorded)', () => {
  beforeEach(async () => {
    // Clean the test databases first
    await User.deleteMany({});
    await Conversation.deleteMany({});
    TEST_PATIENT1.password = await bcrypt.hash(TEST_PATIENT1.password, 10);
    TEST_DOCTOR1.password = await bcrypt.hash(TEST_DOCTOR1.password, 10);
    // Add the Test Users through Mongoose instead of API
    await new User(TEST_PATIENT1).save();
    await new User(TEST_DOCTOR1).save();
  });

  test('POST+GET /api/conversations/:id : TEST_PATIENT1 can send a message and see it displayed', async () => {
    // Begin by logging in the patient user
    const loginResponse = await api
      .post('/api/login')
      .send({
        email: TEST_PATIENT1.email,
        password: nonHashedPassword,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
    // expect that the authorization was successful (auth field in response === true)
    expect(loginResponse.body.auth).toBe(true);

    // Start of chat-related functionality test
    const userIdDoctor = await usersHelper.getUserId(TEST_DOCTOR1);
    const testMessage = 'test message';

    // Get the empty messages between logged in TEST_PATIENT1 and particular TEST_DOCTOR1
    // via their ID. This is done to instantiate a conversation record between these two new users
    await api
      .get(`/api/conversations/${userIdDoctor}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
    // expect that the GET request was successful and conversation was created
      .expect(200)
      .expect('Content-Type', /application\/json/);

    // Send a message to the particular TEST_DOCTOR1 via their ID
    await api
      .post(`/api/conversations/${userIdDoctor}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        content: testMessage,
      })
    // expect that the POST request was successful and the message was saved to the DB
      .expect(200);

    // Get the messages between logged in TEST_PATIENT1 and particular TEST_DOCTOR1 via their ID
    const chatResponse = await api
      .get(`/api/conversations/${userIdDoctor}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
    // expect that the GET request was successful and the message was saved to the DB
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const { body } = chatResponse;
    expect(body.messages[body.messages.length - 1].content).toBe(testMessage);
  });
});

// Close mongoose connection from supertest(app)
afterAll(() => {
  mongoose.connection.close();
});
