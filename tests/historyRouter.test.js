/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const HealthForm = require('../models/healthform');
const healthformsHelper = require('./helperHealthforms');

// Run our backend under test
const api = supertest(app);

// Get predefined test healthforms from healthFormsHelper
const {
  TEST_HEALTHFORM1, TEST_HEALTHFORM2, TEST_HEALTHFORM3, TEST_HEALTHFORM4,
} = healthformsHelper.testHealthforms;

describe('GET REST API request on /api/history', () => {
  beforeAll(async () => {
    // Clean the test database first
    await HealthForm.deleteMany({});

    await new HealthForm(TEST_HEALTHFORM1).save();
    await new HealthForm(TEST_HEALTHFORM2).save();
    await new HealthForm(TEST_HEALTHFORM3).save();
    await new HealthForm(TEST_HEALTHFORM4).save();
  });

  test('Test to see if nth updatedAt timestamp is newer than (or equal to) the n+1th updatedAt timestamp', async () => {
    await api
      .get('/api/history')
      .expect(200)
    // eslint-disable-next-line max-len
    //   .expect(new Date(TEST_HEALTHFORM1.updatedAt).getTime()).toBeLessThanOrEqual(new Date(TEST_HEALTHFORM2.updatedAt).getTime()) // unlike toBeGreaterThanOrEqual below
      .then((res) => {
        // eslint-disable-next-line max-len
        expect(Object.keys(res.body).length).toBe(3); // makes sure that the test health form that's older than seven days (TEST_HEALTHFORM4) is not included

        const date0 = new Date(res.body[0].updatedAt);
        const date1 = new Date(res.body[1].updatedAt);
        const date2 = new Date(res.body[2].updatedAt);

        // more time from epoch time means newer
        expect(date0.getTime()).toBeGreaterThanOrEqual(date1.getTime());
        expect(date1.getTime()).toBeGreaterThanOrEqual(date2.getTime());
        // eslint-disable-next-line max-len
        expect(date2.getTime()).toBeGreaterThanOrEqual(new Date(TEST_HEALTHFORM4.updatedAt).getTime()); // uses TEST_HEALTHFORM4 because that health form is not in the response object (since it's older than seven days)
      });
  });

  test('Test to see if last time stamp is not older than seven days from the current date', async () => {
    await api
      .get('/api/history')
      .expect(200)
      .then((res) => {
        // eslint-disable-next-line max-len
        expect(Object.keys(res.body).length).toBe(3); // makes sure that the test health form that's older than seven days (TEST_HEALTHFORM4) is not included

        const fakeNow = new Date('2022-04-06T10:10:29.931Z'); // Hardcode the now (so that the test keeps working reliably in the future).

        const date0 = new Date(res.body[0].updatedAt);
        const date1 = new Date(res.body[1].updatedAt);
        const date2 = new Date(res.body[2].updatedAt);
        // eslint-disable-next-line max-len
        const date3 = new Date(TEST_HEALTHFORM4.updateAt); // uses TEST_HEALTHFORM4 because that health form is not in the response object (since it's older than seven days)

        // eslint-disable-next-line max-len
        expect(fakeNow.getTime() - date0.getTime()).toBeLessThanOrEqual(7 * 24 * 3600 * 1000);
        expect(fakeNow.getTime() - date1.getTime()).toBeLessThanOrEqual(7 * 24 * 3600 * 1000);
        expect(fakeNow.getTime() - date2.getTime()).toBeLessThanOrEqual(7 * 24 * 3600 * 1000);
        expect(fakeNow.getTime() - date3.getTime()).not.toBeLessThanOrEqual(7 * 24 * 3600 * 1000);
      });
  });
});

// Close mongoose connection from supertest(app)
afterAll(async () => {
  await api
    .delete('/api/forms/healthform')
    .expect(204);
  mongoose.connection.close();
});
