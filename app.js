const express = require('express');
require('express-async-errors'); // enables use of middleware.errorHandler

const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const indexRouter = require('./routes/index');
const statusRouter = require('./routes/status');
const oldapiRouter = require('./controllers/oldapi');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();

// Attach middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setting up request logger (hide the jsondata when in prod)
if (config.env.isProd()) {
  app.use(middleware.requestLogger('tiny'));
}
if (config.env.isDev()) {
  app.use(middleware.requestLogger(':method :url :status - :response-time ms :JSONdata'));
}

// Setting up Mongoose
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
logger.info(`Connected to db: ${config.DBNAME}`);
logger.info(`Listening on port: ${config.PORT}`);

// Static Pages Routes
app.use('/', indexRouter);
app.use('/status', statusRouter);

// API Routes
app.use('/rest/api', oldapiRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

// Custom processing of errorMessage (mostly related to mongoose)
// Using `express-async-errors` package, no need to wrap async
//  calls with try/catch, but need middleware
// This middleware wraps async calls automatically and does errorHandling when error is thrown
// Must be last loaded middleware
app.use(middleware.errorHandler);

module.exports = app;
