import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom'; //  useLocation??

import {
  Box,
  Paper,
  Button,
  Typography,
  TextField,
  Divider,
  InputAdornment,
} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import CreateIcon from '@mui/icons-material/Create';

import loginService from '../services/login';
import Logo from '../components/Logo';

function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    // for <form>s
    event.preventDefault();
    try {
      const payload = {
        email,
        password,
      };

      // Get response from axios
      const response = await loginService.login(payload);
      if (response.status === 200) {
        setIsError(false);
        navigate('/dashboard', { state: { name: response.data.firstName, role: response.data.role } });
      }
    } catch (exception) {
      setIsError(true);
      setMessage('Error: Wrong Credentials');
    }
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleEmailChange = ({ target }) => setEmail(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);
  const getMessage = () => message;

  const renderErrorMessage = () => {
    if (isError) {
      return (
        <Box>
          <Paper
            sx={{ p: 0.75 }}
          >
            <Typography
              name="error-message"
              color="error"
              align="center"
            >
              {getMessage()}
            </Typography>
          </Paper>
          <br />
        </Box>
      );
    }
    return '';
  };

  return (
    <Box>
      <Logo type="extended" />
      <br />
      <Paper
        sx={{ p: 2 }}
      >
        <br />
        <Box>
          <TextField
            name="email-field"
            id="filled-basic"
            placeholder="Email"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>),
            }}
            onChange={handleEmailChange}
          />
        </Box>
        <br />
        <Box>
          <TextField
            name="password-field"
            id="filled-password-input"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>),
            }}
            onChange={handlePasswordChange}
          />
        </Box>
        <br />
        <Box>{renderErrorMessage()}</Box>
        <Box>
          <Button
            name="login-button"
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={handleSubmit}
            fullWidth
          >
            LOGIN
          </Button>
        </Box>
        <br />
        <Box
          textAlign="center"
        >
          <Typography
            color="secondary"
          >
            FORGOT PASSWORD?
          </Typography>
        </Box>
        <br />
        <Divider />
        <br />
        <Box
          textAlign="center"
        >
          <Button
            name="register-button"
            variant="contained"
            startIcon={<CreateIcon />}
            onClick={handleSignUp}
          >
            CREATE NEW ACCOUNT
          </Button>
        </Box>
        <br />
      </Paper>
    </Box>
  );
}

export default LoginScreen;
