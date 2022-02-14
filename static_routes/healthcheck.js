const express = require('express');

const healthRouter = express.Router();

/* Health Check endpoint, used for CI/CD */
healthRouter.get('/', (req, res) => {
  res.send('ok');
});

module.exports = healthRouter;
