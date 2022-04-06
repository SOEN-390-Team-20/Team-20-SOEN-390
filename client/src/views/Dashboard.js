import * as React from 'react';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline, Box, Toolbar, Typography, Avatar, Stack,
} from '@mui/material/';
import Sidebar from '../components/Sidebar';
import Patientboard from '../components/patientboard';
import user1 from '../components/images/user1.jpg';
import ChatContainerModal from '../components/chat/ChatContainerModal';

const getInitialState = () => {
  if (useLocation().state !== null) {
    return {
      name: useLocation().state.name,
      role: useLocation().state.role,
      hin: useLocation().state.hin,
    };
  }
  return { name: 'N/A', role: 'N/A', hin: '0' };
};

function DashboardContent() {
  const [nam, setnam] = useState(null);
  const { name } = getInitialState();
  const welcomeMessage = `Hello, ${nam}`;
  const { role } = getInitialState();
  // const greeting = `Nice to see you back, ${role}`;
  const { hin } = getInitialState();
  const infoSaved = { nameSaved: `${name}`, roleSaved: `${role}`, hinSaved: `${hin}` };

  useEffect(() => {
    async function fetchMyAPI() {
      const namee = localStorage.getItem('name');
      setnam(namee);
    }

    fetchMyAPI();
    console.log('hola todos');
  }, []);
  const mdTheme = createTheme();

  console.log(name);
  console.log(role);
  console.log(hin);
  // console.log(logo);

  // These are the states that control the ChatContainerModal visibility
  const [openChatModal, setOpenChatModal] = React.useState(false);
  const handleOpenChatModal = () => setOpenChatModal(true);
  const handleCloseChatModal = () => setOpenChatModal(false);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>

        <CssBaseline />
        <Sidebar handleChatOpen={handleOpenChatModal} />

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
            {nam
              && (
              <Typography variant="h2" style={{ color: '#00296B' }}>
                {welcomeMessage}
              </Typography>
              )}
            <Stack direction="row" spacing={0}>

              <Avatar alt="Remy Sharp" src={user1} sx={{ width: 60, height: 60 }} position="inline" />
            </Stack>

          </Box>
          <Patientboard data={infoSaved} />
        </Box>
        <ChatContainerModal handleChatClose={handleCloseChatModal} open={openChatModal} />
      </Box>
    </ThemeProvider>
  );
}
export default function Dashboard() {
  return <DashboardContent />;
}
