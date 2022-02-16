const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { body } = request;

  // Query MongoDb with email and get matching user (will be null if none)
  const user = await User.findOne({
    email: body.email,
  });

  // Password Checking
  const isCorrectPassword = user === null
    ? false
    : body.password === user.password;

  // Bad username or Password: 401
  if (!(user && isCorrectPassword)) {
    return response.status(401).json({
      error: 'Error: Invalid Username or Password',
    });
  }

  // OK 200
  return response.status(200).json({
    email: user.email,
    hin: user.hin,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    associated_users: user.associated_users,
  });
});

loginRouter.post('/new', async (request, response) => {
  const { body } = request;

  // Query MongoDb with email and get matching user (will be null if none)

  const user = await User.findOne({
    email: body.email,
  });

  // Bad Username: 401
  if (user == null) {
    return response.status(401).json({
      error: 'Error: Invalid Username or Password',
    });
  }

  const isCorrectPassword = await bcrypt.compareSync(body.password, user.password);

  // Bad Password: 401
  if (!(isCorrectPassword)) {
    return response.status(401).json({
      error: 'Error: Invalid Username or Password',
    });
  }

  const claim = { email: user.email, role: user.role };

  // creating the jw token
  const jtoken = jwt.sign(claim, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

  // OK 200
  return response.status(200).json(jtoken);
});

module.exports = loginRouter;
