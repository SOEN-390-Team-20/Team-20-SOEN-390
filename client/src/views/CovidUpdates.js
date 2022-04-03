import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline, Box, Toolbar, Typography, Avatar, Stack,
} from '@mui/material/';
import Sidebar from '../components/Sidebar';
import Patientboard from '../components/patientboard';
import user1 from '../components/images/user1.jpg';
// import Doctorboard from '../components/Doctorboard';

const getInitialNameState = () => {
  if (useLocation().state !== null) {
    return { name: useLocation().state.name, role: useLocation().state.role };
  }
  return { name: 'N/A', role: 'N/A' };
};

function DashboardContent() {
  const { name } = getInitialNameState();
  const welcomeMessage = `Hello, ${name}`;
  // const { role } = getInitialNameState();
  // const greeting = `Nice to see you back, ${role}`;

  const mdTheme = createTheme();

  // console.log(logo);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>

        <CssBaseline />
        <Sidebar />

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
              {welcomeMessage}
            </Typography>
            <Stack direction="row" spacing={0}>

              <Avatar alt="Remy Sharp" src={user1} sx={{ width: 60, height: 60 }} position="inline" />

            </Stack>

          </Box>
          <Patientboard />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default function Dashboard() {
  return <DashboardContent />;
}
