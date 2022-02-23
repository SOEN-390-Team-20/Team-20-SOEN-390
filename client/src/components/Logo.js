import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import BellLogo from './images/BellLogo.png';

function Logo(props) {
  const { type } = props;

  switch (type) {
    case 'extended':
      return (
        <Box
          textAlign="center"
        >
          <img src={BellLogo} alt="Logo" />
          <Box>
            <Typography
              variant="h3"
              color="primary"
            >
              JeVaisBienAller
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h5"
              color="secondary"
            >
              COVID Tracker
            </Typography>
          </Box>
        </Box>
      );
    default:
      return (
        <Typography
          variant="h3"
        >
          JeVaisBienAller
        </Typography>
      );
  }
}

export default Logo;
