/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline, Box, Toolbar, Typography, Avatar, Stack,
} from '@mui/material/';
import user1 from '../components/images/user1.jpg';
import usersService from '../services/users';

function UserInfo(props) {
  const { user } = props;

  if (!user) {
    return (
      <Typography variant="h1" style={{ color: '#00296B' }}>
        Invalid ID
      </Typography>
    );
  }

  return (
    <>
      <div>
        <Typography variant="h3" style={{ color: '#00296B' }}>
          {user.firstName}
          {' '}
          {user.lastName}
        </Typography>
      </div>
      <div>
        <Typography variant="h4" style={{ color: '#00296B' }}>
          Covid Status:
          {' '}
          {user.covidStatus}
        </Typography>
      </div>
      <div>
        <Typography variant="h4" style={{ color: '#00296B' }}>
          Vaccine #1:
          {' '}
          {user.vaccine1}
        </Typography>
      </div>
      <div>
        <Typography variant="h4" style={{ color: '#00296B' }}>
          Vaccine #2:
          {' '}
          {user.vaccine2}
        </Typography>
      </div>
      <div>
        <Typography variant="h4" style={{ color: '#00296B' }}>
          Vaccine #3:
          {' '}
          {user.vaccine3}
        </Typography>
      </div>
    </>
  );
}

function PublicProfileContent() {
  const [user, setUser] = useState();
  const { id } = useParams();

  useEffect(() => {
    usersService.getUserById(id).then((response) => {
      setUser(response.data);
    });
  });

  const tempUser = { firstName: 'test ' };

  const mdTheme = createTheme();

  // console.log(logo);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>

        <CssBaseline />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === 'light'
              ? theme.palette.white
              : theme.palette.white),
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Box>
            <Typography variant="h2" style={{ color: '#00296B' }}>
              Public Profile
            </Typography>
            <Stack direction="row" spacing={0}>

              <Avatar alt="Remy Sharp" src={user1} sx={{ width: 60, height: 60 }} position="inline" />
            </Stack>
            <UserInfo user={user} />

          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default function PublicProfile() {
  return <PublicProfileContent />;
}
