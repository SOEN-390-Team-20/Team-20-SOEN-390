const mongoose = require('mongoose');

const activeTokensSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },

});

const tokens = mongoose.model('activeTokens', activeTokensSchema);

module.exports = tokens;
