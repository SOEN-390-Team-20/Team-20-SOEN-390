/* eslint-disable quotes */
/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Box,
  Typography,
  TextField,
} from '@mui/material';

function RegisterUserInfo({ handleChange, dataFromParent }) {
  return (
    <div>
      <Box
        textAlign="center"
      >
        <Typography
          color="secondary"
        >
          COMPLETE YOUR PERSONAL
          <br />
          INFORMATION
        </Typography>
        <br />
        <Box>
          <TextField
            id="filled-basic"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
          />
          <TextField
            id="filled-basic"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
          />
        </Box>
        <br />
        <Box>
          <TextField
            id="filled-basic"
            // eslint-disable-next-line no-constant-condition
            placeholder={dataFromParent === 'doctor' ? 'MINC' : (dataFromParent === 'patient' ? 'Health Insurance Number' : 'Administrator ID')}
            name="hin"
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>
    </div>
  );
}

export default RegisterUserInfo;
