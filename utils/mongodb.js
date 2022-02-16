// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoClient } = require('mongodb');
const config = require('./config');
const logger = require('./logger');

const showDb = () => {
  MongoClient.connect(config.MONGO_URI, (err, db) => {
    if (err) throw err;
    const dbo = db.db(config.DBNAME);
    // eslint-disable-next-line no-shadow
    dbo.collection('channels').find().toArray((err, result) => {
      if (err) throw err;
      logger.info(result);
      db.close();
    });
  });
};

module.exports = {
  showDb,
};
