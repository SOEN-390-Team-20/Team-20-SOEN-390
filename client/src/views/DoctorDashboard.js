import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { createTheme } from '@mui/material/styles';
import {
  CssBaseline, Box, Toolbar, ListItem, ListItemAvatar, ListItemText, Avatar,
} from '@mui/material/';
import Sidebar from '../components/Sidebar';
import Patientboard from '../components/Doctorboard';
import user1 from '../components/images/user1.jpg';
import doctorPatients from '../services/doctorPatients';

// import Doctorboard from '../components/Doctorboard';

const getInitialNameState = () => {
  if (useLocation().state !== null) {
    const name = localStorage.getItem('name');
    return {
      name,
      role: useLocation().state.role,
      patients: useLocation().state.patients,
    };
  }
  return { name: 'N/A', role: 'N/A' };
};

function DashboardContent() {
  const [pat, setpat] = useState(null);
  const [nam, setnam] = useState(null);
  // const { name } = getInitialNameState();
  const welcomeMessage = `Hello, ${nam}`;
  const { patients } = getInitialNameState();
  console.log(patients);
  // const { role } = getInitialNameState();
  // const greeting = `Nice to see you back, ${role}`;

  useEffect(() => {
    async function fetchMyAPI() {
      const email = localStorage.getItem('email');
      const name = localStorage.getItem('name');
      const patientsl = await doctorPatients.getPatients({ email });
      setpat(patientsl.data);
      setnam(name);
      console.log(patientsl);
    }
    fetchMyAPI();
  }, []);

  // console.log(logo);
  return (
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
          {nam && (
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={user1}
                  sx={{ width: 106, height: 106 }}
                />
              </ListItemAvatar>
              <ListItemText>
                <h1 style={{ color: '#00296B' }}>
                  {' '}
                  {welcomeMessage}
                </h1>
              </ListItemText>

            </ListItem>
          )}

        </Box>
        { pat && <Patientboard listOfPatients={pat} />}
      </Box>
    </Box>
  );
}
export default function Dashboard() {
  return <DashboardContent />;
}
