require('dotenv').config();
/**
 *
 * @returns Correct Database Name depending on environment
 */
function getDbName() {
  const PROD_DBNAME = 'jevaisbienaller';
  const DEV_DBNAME = 'jevaisbienaller-dev';
  const TEST_DBNAME = 'jevaisbienaller-test';
  const CIRCLE_DBNAME = 'jevaisbienaller-circle';

  switch (process.env.NODE_ENV) {
    case 'production':
      return PROD_DBNAME;
    case 'development':
      return DEV_DBNAME;
    case 'test':
      return TEST_DBNAME;
    case 'circle':
      return CIRCLE_DBNAME;
    default:
      return DEV_DBNAME;
  }
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Port
const PORT = normalizePort(process.env.PORT || '3001');

// MongoDB Constants
const MONGO_USERNAME = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASS;
const DBNAME = getDbName();
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.efezn.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;

// Env
const env = {
  isDev: () => process.env.NODE_ENV === 'development',
  isProd: () => process.env.NODE_ENV === 'production',
  isTest: () => process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'circle',
};

module.exports = {
  PORT,
  DBNAME,
  MONGO_URI,
  env,
};
