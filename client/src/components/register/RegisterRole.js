import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';

function RegisterRole(props) {
  const { handleChange } = props;

  return (
    <div>
      <Box
        textAlign="center"
      >
        <Typography
          color="secondary"
        >
          SELECT YOUR ROLE
        </Typography>
        <br />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label" />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="patient"
            name="role"
            onChange={handleChange}
          >
            <FormControlLabel value="patient" control={<Radio />} label="Patient" />
            <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
        </FormControl>
      </Box>
    </div>
  );
}

export default RegisterRole;
