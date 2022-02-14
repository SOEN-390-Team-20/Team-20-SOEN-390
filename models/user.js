const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// `unique: true` requires uniqueValidator
const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  hin: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  /* Eventually we will have something like this
    symptoms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Symptom'
    }], */
  associated_users: [
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    this,
  ],
});

// Bind uniqueValidator to schema
userSchema.plugin(uniqueValidator);

// Make a model with the schema and mongoose credentials
const User = mongoose.model('User', userSchema);

module.exports = User;
