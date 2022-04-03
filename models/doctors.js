const mongoose = require('mongoose');

const doctorsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  patients: {
    type: [String],
  },

});

const doctors = mongoose.model('doctors', doctorsSchema);

module.exports = doctors;
