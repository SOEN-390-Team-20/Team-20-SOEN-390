import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Typography,
  Paper,
  Button,
} from '@mui/material';

function HomePage() {
  const navigate = useNavigate();
  const Login = () => {
    navigate('/login', { state: { isLogin: true } });
  };
  const Signup = () => {
    navigate('/register', { state: { isLogin: false } });
  };

  return (
    <Paper>
      <Typography variant="h3">
        JeVaisBienAller
      </Typography>
      <Button variant="contained" onClick={Login}>Log In</Button>
      <Button variant="outlined" onClick={Signup}>Sign Up</Button>
    </Paper>
  );
}

export default HomePage;
