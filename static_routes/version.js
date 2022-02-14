const express = require('express');

const versionRouter = express.Router();

versionRouter.get('/', (req, res) => {
  res.send('1');
});

module.exports = versionRouter;
