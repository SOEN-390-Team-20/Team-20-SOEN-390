const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const healthFormSchema = new mongoose.Schema({

  feverOrChills: {
    type: Boolean,
    required: true,
  },
  temperature: {
    type: Number,
    required: false,
  },
  suddenLossOfSenseOfSmellAndTaste: {
    type: Boolean,
    required: true,
  },
  difficultyBreathingOrShortnessOfBreath: {
    type: Boolean,
    required: true,
  },
  cough: {
    type: Boolean,
    required: true,
  },
  runnyOrStuffyNose: {
    type: Boolean,
    required: true,
  },
  outsideCanadaTravellingInPast14Days: {
    type: Boolean,
    required: true,
  },
  closeContactWithSuspectedCase: {
    type: Boolean,
    required: true,
  },
  unusualSevereFatigue: {
    type: Boolean,
    required: true,
  },
  unusualHeadache: {
    type: Boolean,
    required: true,
  },
  significantLossOfAppetite: {
    type: Boolean,
    required: true,
  },
  unusualOrUnexplainedMusclePainOrStiffness: {
    type: Boolean,
    required: true,
  },
  soreThroatWithoutObviousCause: {
    type: Boolean,
    required: true,
  },
  hin: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
}, { timestamps: true });

// Bind uniqueValidator to schema
healthFormSchema.plugin(uniqueValidator);

// Make a model with the schema and mongoose credentials
const HealthForm = mongoose.model('HealthForm', healthFormSchema);

module.exports = HealthForm;
