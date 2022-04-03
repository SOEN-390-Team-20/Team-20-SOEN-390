const express = require('express');
// TODO_LATER: const bcrypt = require('bcrypt');

const formsRouter = express.Router();
const HealthForm = require('../models/healthform');
const config = require('../utils/config');
// TODO_LATER: const config = require('../utils/config');

// Gets a list of health forms (does not work in prod)
formsRouter.get('/healthforms', async (request, response) => {
  if (config.env.isDev() || config.env.isTest()) {
    const healthforms = await HealthForm.find();
    response.json(healthforms);
  } else {
    response.status(401).json({
      error: 'Unauthorized operation',
    });
  }
});

// Submit a new health form
formsRouter.post('/healthform', async (request, response) => {
  // Get request.body and put it in new var body
  const { body } = request;

  if (Object.keys(body).length === 13 && body.feverOrChills === false) {
    // Using body, set new payload
    const healthform = new HealthForm({
      feverOrChills: body.feverOrChills,
      suddenLossOfSenseOfSmellAndTaste: body.suddenLossOfSenseOfSmellAndTaste,
      difficultyBreathingOrShortnessOfBreath: body.difficultyBreathingOrShortnessOfBreath,
      cough: body.cough,
      runnyOrStuffyNose: body.runnyOrStuffyNose,
      outsideCanadaTravellingInPast14Days: body.outsideCanadaTravellingInPast14Days,
      closeContactWithSuspectedCase: body.closeContactWithSuspectedCase,
      unusualSevereFatigue: body.unusualSevereFatigue,
      unusualHeadache: body.unusualHeadache,
      significantLossOfAppetite: body.significantLossOfAppetite,
      unusualOrUnexplainedMusclePainOrStiffness: body.unusualOrUnexplainedMusclePainOrStiffness,
      soreThroatWithoutObviousCause: body.soreThroatWithoutObviousCause,
      hin: body.hin,
    });

    // Send the payload via mongoose, wait for response then return it
    const savedHealthForm = await healthform.save();
    response.json(savedHealthForm);
  } else if (Object.keys(body).length === 14 && body.feverOrChills === true) {
    // Using body, set new payload
    const healthform = new HealthForm({
      feverOrChills: body.feverOrChills,
      temperature: body.temperature,
      suddenLossOfSenseOfSmellAndTaste: body.suddenLossOfSenseOfSmellAndTaste,
      difficultyBreathingOrShortnessOfBreath: body.difficultyBreathingOrShortnessOfBreath,
      cough: body.cough,
      runnyOrStuffyNose: body.runnyOrStuffyNose,
      outsideCanadaTravellingInPast14Days: body.outsideCanadaTravellingInPast14Days,
      closeContactWithSuspectedCase: body.closeContactWithSuspectedCase,
      unusualSevereFatigue: body.unusualSevereFatigue,
      unusualHeadache: body.unusualHeadache,
      significantLossOfAppetite: body.significantLossOfAppetite,
      unusualOrUnexplainedMusclePainOrStiffness: body.unusualOrUnexplainedMusclePainOrStiffness,
      soreThroatWithoutObviousCause: body.soreThroatWithoutObviousCause,
      hin: body.hin,
    });

    // Send the payload via mongoose, wait for response then return it
    const savedHealthForm = await healthform.save();
    response.json(savedHealthForm);
  } else {
    response.status(422).json({
      error: 'Unprocessable Entity',
    });
  }
});

// Deletes healthform (does not work in prod)
formsRouter.delete('/healthform', async (request, response) => {
  if (config.env.isDev() || config.env.isTest()) {
    await HealthForm.deleteMany({});
    response.status(204).end();
  } else {
    // Unauthorized
    response.status(401).json({
      error: 'Unauthorized operation',
    });
  }
});

module.exports = formsRouter;
