/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const HealthForm = require('../models/user');

// Run our backend under test
const api = supertest(app);

const TEST_HEALTHFORM1 = {
  feverOrChills: false,
  suddenLossOfSenseOfSmellAndTaste: false,
  difficultyBreathingOrShortnessOfBreath: true,
  cough: false,
  runnyOrStuffyNose: true,
  outsideCanadaTravellingInPast14Days: false,
  closeContactWithSuspectedCase: true,
  unusualSevereFatigue: false,
  unusualHeadache: true,
  significantLossOfAppetite: false,
  unusualOrUnexplainedMusclePainOrStiffness: true,
  soreThroatWithoutObviousCause: false,
  hin: '740WL3V01',
};

const TEST_HEALTHFORM2 = {
  feverOrChills: true,
  suddenLossOfSenseOfSmellAndTaste: false,
  difficultyBreathingOrShortnessOfBreath: true,
  cough: false,
  runnyOrStuffyNose: true,
  outsideCanadaTravellingInPast14Days: false,
  closeContactWithSuspectedCase: true,
  unusualSevereFatigue: false,
  unusualHeadache: true,
  significantLossOfAppetite: false,
  unusualOrUnexplainedMusclePainOrStiffness: true,
  soreThroatWithoutObviousCause: false,
  hin: '740WL3V02',
};

const TEST_HEALTHFORM3 = {
  feverOrChills: false,
  temperature: 30,
  suddenLossOfSenseOfSmellAndTaste: false,
  difficultyBreathingOrShortnessOfBreath: true,
  cough: false,
  runnyOrStuffyNose: true,
  outsideCanadaTravellingInPast14Days: false,
  closeContactWithSuspectedCase: true,
  unusualSevereFatigue: false,
  unusualHeadache: true,
  significantLossOfAppetite: false,
  unusualOrUnexplainedMusclePainOrStiffness: true,
  soreThroatWithoutObviousCause: false,
  hin: '740WL3V03',
};

const TEST_HEALTHFORM4 = {
  feverOrChills: true,
  temperature: 30,
  suddenLossOfSenseOfSmellAndTaste: false,
  difficultyBreathingOrShortnessOfBreath: true,
  cough: false,
  runnyOrStuffyNose: true,
  outsideCanadaTravellingInPast14Days: false,
  closeContactWithSuspectedCase: true,
  unusualSevereFatigue: false,
  unusualHeadache: true,
  significantLossOfAppetite: false,
  unusualOrUnexplainedMusclePainOrStiffness: true,
  soreThroatWithoutObviousCause: false,
  hin: '740WL3V04',
};

const TEST_HEALTHFORM5 = {
  feverOrChills: true,
  temperature: 'notANumber',
  suddenLossOfSenseOfSmellAndTaste: false,
  difficultyBreathingOrShortnessOfBreath: true,
  cough: false,
  runnyOrStuffyNose: true,
  outsideCanadaTravellingInPast14Days: false,
  closeContactWithSuspectedCase: true,
  unusualSevereFatigue: false,
  unusualHeadache: true,
  significantLossOfAppetite: false,
  unusualOrUnexplainedMusclePainOrStiffness: true,
  soreThroatWithoutObviousCause: false,
  hin: '740WL3V05',
};

describe('REST API request on /api/forms/healthform', () => {
  test('POST /api/forms/healthform with feverOrChills being false and temperature not being included is successful', async () => {
    await api
      .post('/api/forms/healthform')
      .send(TEST_HEALTHFORM1)
      .expect(200);
  });

  test('POST /api/forms/healthform with feverOrChills being true and temperature not being included is not successful', async () => {
    await api
      .post('/api/forms/healthform')
      .send(TEST_HEALTHFORM2)
      .expect(422);
  });

  test('POST /api/forms/healthform with feverOrChills being false and temperature being included is not successful', async () => {
    await api
      .post('/api/forms/healthform')
      .send(TEST_HEALTHFORM3)
      .expect(422);
  });

  test('POST /api/forms/healthform with feverOrChills being true and temperature being included is successful', async () => {
    await api
      .post('/api/forms/healthform')
      .send(TEST_HEALTHFORM4)
      .expect(200);
  });

  test('POST /api/forms/healthform with feverOrChills being true and temperature being included but not as a number is not successful', async () => {
    await api
      .post('/api/forms/healthform')
      .send(TEST_HEALTHFORM5)
      .expect(400);
  });
});

// Close mongoose connection from supertest(app)
afterAll(async () => {
  await api
    .delete('/api/forms/healthform')
    .expect(204);
  mongoose.connection.close();
});
