/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';

function Success(props) {
  const { values, onSubmit } = props;

  return (
    <div>
      <Box>
        <Typography
          color="secondary"
          textAlign="center"
        >
          VERIFY YOUR INFORMATION!
        </Typography>
        <br />
        <Typography
          color="primary"
        >
          ACCOUNT DETAILS:
        </Typography>
        <br />
        <Box>
          <Typography
            color="primary"
          >
            First Name: {values.firstName}
          </Typography>
          <Typography
            color="primary"
          >
            Last Name: {values.lastName}
          </Typography>
          <Typography
            color="primary"
          >
            HIN: {values.hin}
          </Typography>
          <Typography
            color="primary"
          >
            Email: {values.email}
          </Typography>
          <Typography
            color="primary"
          >
            Role: {values.role}
          </Typography>
        </Box>
        <Box>
          <br />
          <Button
            name="submit-button"
            variant="contained"
            onClick={onSubmit}
            fullWidth
          >
            Submit & Login
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Success;
