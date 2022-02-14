const express = require('express');

const usersRouter = express.Router();
const User = require('../models/user');
const config = require('../utils/config');

// Gets a list of users (does not work in prod)
usersRouter.get('/', async (request, response) => {
  if (config.env.isDev() || config.env.isTest()) {
    const users = await User.find();
    response.json(users);
  } else {
    response.status(401).json({
      error: 'Unauthorized operation',
    });
  }
});

// Register a new user
usersRouter.post('/', async (request, response) => {
  // Get request.body and put it in new var body
  const { body } = request;

  // Using body, set new payload
  const user = new User({
    email: body.email,
    hin: body.hin,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
    role: body.role,
    associated_users: body.associated_users,
  });

  // Send the payload via mongoose, wait for response then return it
  const savedUser = await user.save();
  response.json(savedUser);
});

// Deletes user (does not work in prod)
usersRouter.delete('/', async (request, response) => {
  if (config.env.isDev() || config.env.isTest()) {
    await User.deleteMany({});
    response.status(204).end();
  } else {
    // Unauthorized
    response.status(401).json({
      error: 'Unauthorized operation',
    });
  }
});

// Get (the information of) a particular user.
usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  // TODO Should probably make sure it's the user first
  // or anonymize the data

  const result = await User.findById(id);
  response.json(result);
});

// Modify (the information of) a particular user.
usersRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const filter = { _id: id };
  const update = {
    email: request.body.email,
    hin: request.body.hin,
    password: request.body.password,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    role: request.body.role,
    associated_users: request.body.associated_users,
  };

  // Update and return the new object
  // { new: true } is a parameter to return the new object
  // otherwise it returns the original object.
  const result = await User.findOneAndUpdate(filter, update, { new: true });
  response.json(result);
});

// Delete (the information of) a particular user.
usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  // TODO Should probably make sure it's the user first
  // or some authorized user

  await User.findByIdAndDelete(id);
  response.status(204).end();
});

module.exports = usersRouter;
