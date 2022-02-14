const express = require('express');

const oldapiRouter = express.Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoClient } = require('mongodb'); // will be removed anyway
const User = require('../models/user');
const logger = require('../utils/logger');
const config = require('../utils/config');

const dbName = config.DBNAME;
const url = config.MONGO_URI;
const collectionName = 'users';

function returnQuery(myCallback) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbVar = db.db(dbName);
    // eslint-disable-next-line no-shadow
    dbVar.collection(collectionName).find().toArray((err, result) => {
      if (err) throw err;
      logger.info(result);
      myCallback(result);
      db.close();
    });
  });
}

function returnQueryLoad(myCallback, load) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbVar = db.db(dbName);
    // eslint-disable-next-line no-shadow
    dbVar.collection(collectionName).find({ email: load }).toArray((err, result) => {
      if (err) throw err;
      logger.info(result);
      myCallback(result);
      db.close();
    });
  });
}

oldapiRouter.post('/add-user', (req, res) => {
  const { hin } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { role } = req.body;
  const { firstName } = req.body;
  const { lastName } = req.body;

  if (hin === '' || firstName === '' || email === '' || password === '' || lastName === '' || role === '') {
    res.send('error: missing fields');
  } else {
    const payload = new User();
    payload.firstName = firstName;
    payload.email = email;
    payload.hin = hin;
    payload.password = password;
    payload.role = role;
    payload.lastName = lastName;

    payload.save((err, data) => {
      if (err) {
        logger.info(err);
        res.send('error: email or health insurance number already taken ');
      } else {
        res.send('perfect: form sent');
        logger.info(data);
      }
    });
  }
});

oldapiRouter.get('/users', (req, res) => {
  returnQuery((result) => {
    // Only output to npm console (not browser console) because it exposes password
    logger.info(result);
    res.send('Sent result to console.');
  });
});

oldapiRouter.post('/login', (req, res) => {
  if (req.body.email == null || req.body.password == null) {
    res.send('error: field missing');
  } else {
    returnQueryLoad((result) => {
      if (result[0] !== undefined && result[0].password === req.body.password) {
        res.send(result);
      } else {
        res.send('error: invalid password');
      }
    }, req.body.email);
  }
});

module.exports = oldapiRouter;
