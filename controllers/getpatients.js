const express = require('express');

const TokenVerify = require('./auth').verifyJWTAuth;

const getPatientRouter = express.Router();

const doc = require('../models/doctors');
const dil = require('../models/user');

/* eslint-disable */ 
getPatientRouter.post('/', TokenVerify , async (req, res) => {
  const { body } = req;

 if(body.num==0){

  const user = await dil.findOne({
    email: body.email,
  });
  console.log(user)
  return res.status(200).json(user);

  }

else{
    const doctorEmail = body.email;

    // const patientEmail = body.patient;

    const doctor = await doc.findOne({
      email: doctorEmail,
    });

    if (!doctor) {
        return res.sendStatus(404);
    }

    const patients = await dil.find().where('email').in(doctor.patients).exec();
    return res.status(200).json(patients);
  }
});

module.exports = getPatientRouter;
