const requestLogger = require('morgan');
const logger = require('./logger');
const config = require('./config');

// Log requests to console using morgan
requestLogger.token('JSONdata', (request) => JSON.stringify(request.body));

// Handle async errors
const errorHandler = (error, request, response, next) => {
  if (config.env.isDev()) {
    // Prints error type to console
    logger.info(`ErrorHandler message:\nError Type: ${error.name}\n${error.message}`);
  }

  if (error.name === 'ValidationError') {
    response.status(400);
    const isUserAndHinNotUnique = error.message.includes('expected `email` to be unique')
      || error.message.includes('expected `hin` to be unique');

    return isUserAndHinNotUnique
      ? response.json({ error: 'error: email or health insurance number already taken' })
      : response.json({ error: error.message });
  }

  next(error);

  return (null); // happy linter
};

module.exports = {
  requestLogger,
  errorHandler,
};
