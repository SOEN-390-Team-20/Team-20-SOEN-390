/* eslint-disable no-console */
const config = require('./config');

const info = (...params) => {
  if (!config.env.isTest()) {
    console.log(...params);
  }
};

const error = (...params) => {
  if (!config.env.isTest()) {
    console.error(...params);
  }
};

const debug = (...params) => {
  console.log(...params);
};

const testinfo = (...params) => {
  if (config.env.isTest()) {
    console.log(...params);
  }
};

module.exports = {
  info,
  error,
  debug,
  testinfo,
};
