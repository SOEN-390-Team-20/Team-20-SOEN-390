const express = require('express');

const historyRouter = express.Router();
// const { verifyJWTAuth } = require('./auth');
const HealthForm = require('../models/healthform');

// Gets a list of health forms (does not work in prod)
// eslint-disable-next-line no-unused-vars
// historyRouter.get('/', verifyJWTAuth, async (request, response) => {
historyRouter.get('/', async (request, response) => {
  const today = new Date();
  // eslint-disable-next-line max-len
  const healthforms = await HealthForm.find({ updatedAt: { $gte: new Date(today.setDate(today.getDate() - 7)) } });

  // eslint-disable-next-line max-len
  healthforms.sort((healthform1, healthform2) => healthform2.updatedAt - healthform1.updatedAt); // newest goes to the front of the array

  // healthforms.reverse();

  response.json(healthforms);
});

module.exports = historyRouter;
