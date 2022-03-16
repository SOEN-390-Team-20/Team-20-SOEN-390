const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { body } = request;

  // Query MongoDb with email and get matching User (will be null if none)
  const user = await User.findOne({
    email: body.email,
  });

  // Bad Username: 401
  if (user == null) {
    return response.json({ auth: false, message: 'Error: Invalid Username or Password' });
  }

  const isCorrectPassword = await bcrypt.compareSync(body.password, user.password);
  // Bad Password: 401
  if (!isCorrectPassword) {
    return response.json({ auth: false, message: 'Error: Incorrect Username or Password' });
  }

  const tokenPayload = {
    id: user.id,
  };

  // generating the JWT token
  const tokenJWT = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' }, {});

  const responsePayload = {
    auth: true,
    token: tokenJWT,
    profile: {
      firstName: user.firstName,
      role: user.role,
    },
  };

  // OK 200
  return response.status(200).json(responsePayload);
});

module.exports = loginRouter;
