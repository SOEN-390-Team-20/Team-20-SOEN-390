const express = require('express');

const TokenVerify = require('./auth').verifyJWTAuth;

const getPatientRouter = express.Router();

const doc = require('../models/doctors');
const dil = require('../models/user');

/* eslint-disable */ 
getPatientRouter.post('/', TokenVerify , async (req, res) => {
  const { body } = req;

  


    const doctorEmail = body.email;
    console.log(doctorEmail);

    // const patientEmail = body.patient;

    const docc = await doc.findOne({
      email: doctorEmail,
    });
    console.log(docc);

    const patientslist = docc.patients;

    const records = await dil.find().where('email').in(patientslist).exec();
    console.log(records)
    return res.status(200).json(records);
  
});

module.exports = getPatientRouter;
