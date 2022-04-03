const express = require('express');

const conversationsRouter = express.Router();
const User = require('../models/user');
const config = require('../utils/config');
const verifyJWTAuth = require('./auth').verifyJWTAuth;

conversationsRouter.get('/:id', verifyJWTAuth, async (request, response) => {
  const { id } = request.params;
  // var currentUser = check JWT session token to find which user is logged in
  var currentUser = User.find();
  const targetUser = await User.findById(id);
  var temp = 
});

conversationsRouter.post('/new-message', async (request, response) => {
  const { body } = request;

  const currentUser = 123;
});

module.exports = conversationsRouter;
