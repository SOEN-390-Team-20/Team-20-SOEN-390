const express = require('express');

const path = require('path');

const reactRouter = express.Router();

// Finds the file repo/client/build/index.html and serve it
reactRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = reactRouter;
