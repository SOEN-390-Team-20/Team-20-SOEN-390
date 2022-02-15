const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Tokens = require('../models/activeTokens');

// loginRouter.use(function(request,response,next){
//   setTimeout(() => {

//   }, 9000);
//   next()

//   })

loginRouter.post('/', async (request, response) => {
  const { body } = request;

  // Query MongoDb with email and get matching user (will be null if none)
  const user = await User.findOne({
    email: body.email,
  });

  // Password Checking
  // const isCorrectPassword = user === null
  //   ? false
  //   : body.password === user.password;

  const isCorrectPassword = await bcrypt.compareSync(body.password, user.password);

  // Bad username or Password: 401
  if (!(user && isCorrectPassword)) {
    return response.status(401).json({
      error: 'Error: Invalid Username or Password',
    });
  }

  const generatedToken = await bcrypt.hash(await bcrypt.genSaltSync(), 9);

  const newtoken = new Tokens({
    email: user.email,
    token: generatedToken,
    role: user.role,
    time: new Date().getTime().toString(),

  });

  const savedUser = await newtoken.save();
  setTimeout(async () => {
    await Tokens.deleteOne({
      email: newtoken.email,
    });

    console.log(newtoken);
  }, 7200000);
  response.json(savedUser.token);

  // OK 200
  // return response.status(200).json({
  //   email: user.email,
  //   hin: user.hin,
  //   password: user.password,
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   role: user.role,
  // });
});

module.exports = loginRouter;
