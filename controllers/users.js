const express = require('express');
const bcrypt = require('bcrypt');
const Doctor = require('../models/doctors');

const usersRouter = express.Router();
const User = require('../models/user');
const config = require('../utils/config');

// Add a user to a user
usersRouter.put('/:id/add_associated_user', async (request, response) => {
  const parentuser = await User.findById(request.params.id);
  console.log(parentuser);

  const childfilter = { hin: request.body.hin };
  const childupdate = {
    associated_users: [],
  };
  const foundChildUser = await User.findOneAndUpdate(childfilter, childupdate, { new: true });

  parentuser.associated_users.push(foundChildUser);

  const parentfilter = { _id: request.params.id };
  const parentupdate = {
    associated_users: parentuser.associated_users,
  };

  const foundParentUser = await User.findOneAndUpdate(parentfilter, parentupdate, { new: true });
  response.json(foundParentUser);
});

// Gets a list of users (does not work in prod)
usersRouter.get('/', async (request, response) => {
  // if (config.env.isDev() || config.env.isTest()) {
  const users = await User.find();
  response.json(users);
  // } else {
  //   response.status(401).json({
  //     error: 'Unauthorized operation',
  //   });
  // }
});

// Register a new user
usersRouter.post('/old', async (request, response) => {
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

// Register a new user
usersRouter.post('/', async (request, response) => {
  const { body } = request;

  const user = await User.findOne({
    email: body.email,
  });

  if (user) {
    return response.status(400).json({ message: 'That email is already taken' });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = new User({
    email: body.email,
    hin: body.hin,
    password: hashedPassword,
    firstName: body.firstName,
    lastName: body.lastName,
    role: body.role,
    associated_users: body.associated_users,
  });

  if (body.role === 'doctor') {
    const doc = new Doctor({
      email: body.email,
      patients: [],
    });

    await doc.save();
  }

  await newUser.save();
  return response.status(200).json('User registration successful');
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

// Deletes all users (does not work in prod, required for testing)
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

module.exports = usersRouter;
