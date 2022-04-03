const express = require('express');

const conversationsRouter = express.Router();
const User = require('../models/user');
const { verifyJWTAuth } = require('./auth');

/* eslint-disable */
conversationsRouter.get('/:id', verifyJWTAuth, async (request, response) => {
  const { targetId } = request.params;
  const currentUser = await User.findById(request.userId);
  const targetUser = await User.findById(targetId);
});

conversationsRouter.post('/new-message', async (request, response) => {
  const { body } = request;

  const currentUser = 123;
});

module.exports = conversationsRouter;
