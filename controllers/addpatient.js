const express = require('express');
const TokenVerify = require('./auth').verifyJWTAuth;

const addPatientRouter = express.Router();

const doc = require('../models/doctors');

addPatientRouter.post('/', TokenVerify, async (req) => {
  const { body } = req;

  const patientEmail = body.patient;
  const doctorEmail = body.doctor;

  const docc = await doc.findOne({
    email: doctorEmail,
  });
  console.log(docc);

  const patientslist = docc.patients;

  patientslist.push(patientEmail);

  console.log(patientslist);
  doc.updateOne(
    { email: doctorEmail },
    { patients: patientslist },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Updated Docs : ', docs);
      }
    },
  );
});

module.exports = addPatientRouter;
