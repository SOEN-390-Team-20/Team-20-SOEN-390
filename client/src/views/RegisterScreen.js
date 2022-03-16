/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigate } from 'react-router-dom'; // useLocation??
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Box,
  Paper,
  Button,
  Typography,
  TextField,
  Divider,
  InputAdornment,
  Stepper, Step, StepLabel,
} from '@mui/material';

import Logo from '../components/Logo';
import registerService from '../services/register';
import RegisterRole from '../components/register/RegisterRole';
import RegisterUserInfo from '../components/register/RegisterUserInfo';
import RegisterCredentials from '../components/register/RegisterCredentials';
import Success from '../components/register/Success';

const imageBackground = require('../public/images/login-background.png');

function RegisterScreen() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    role: 'patient',
    firstName: '',
    lastName: '',
    hin: '',
    email: '',
    password: '',
  });

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const changeHandle = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Role
  const onSubmit = async (event) => {
    // for <form>s
    event.preventDefault();
    try {
      const payload = {
        ...inputs,
      };

      // Get response from axios
      const response = await registerService.register(payload);
      if (response.status === 200) {
        setIsError(false);
        setMessage('Thank you for registering.');
        navigate('/');
      }
    } catch (exception) {
      setIsError(true);
      setMessage('Error: Could not register');
    }
  };

  const values = {
    ...inputs,
  };

  const [step, setStep] = useState(0);

  // Proceed to next step
  const nextStep = () => {
    setStep((previousStep) => previousStep + 1);
  };

  // Proceed to last step
  const prevStep = () => {
    setStep((previousStep) => previousStep - 1);
  };

  function getSteps() {
    return ['ROLE', 'INFO', 'LOGIN', 'VERIFY'];
  }

  const steps = getSteps();

  function getStepContent(s) {
    switch (s) {
      case 0:
        return (
          <RegisterRole
            nextStep={nextStep}
            handleChange={changeHandle}
            values={values}
          />
        );
      case 1:
        return (
          <RegisterUserInfo
            dataFromParent={inputs.role}
            nextStep={nextStep}
            handleChange={changeHandle}
            values={values}
          />
        );
      case 2:
        return (
          <RegisterCredentials
            nextStep={nextStep}
            handleChange={changeHandle}
            values={values}
          />
        );
      case 3:
        return (
          <Success
            nextStep={nextStep}
            onSubmit={onSubmit}
            values={values}
          />
        );
      default:
        return navigate('/');
    }
  }

  return (
    <Box>
      <Logo type="extended" />
      <br />
      <Paper
        sx={{ p: 2 }}
      >
        <br />
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <br />
        {step === steps.length ? 'Completed' : (
          <>
            {getStepContent(step)}
          </>
        )}
        <Box
          textAlign="center"
        >
          <br />
          <Button
            name="back-button"
            sx={{ m: 1 }}
            variant="outlined"
            onClick={prevStep}
          >
            BACK
          </Button>
          {step < steps.length - 1
            ? (
              <Button
                name="next-button"
                sx={{ m: 1 }}
                variant="contained"
                onClick={nextStep}
              >
                NEXT
              </Button>
            )
            : ''}
        </Box>
        <br />
      </Paper>
    </Box>
  );
}

export default RegisterScreen;
