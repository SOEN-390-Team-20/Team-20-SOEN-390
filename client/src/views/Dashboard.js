import * as React from 'react';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { createTheme } from '@mui/material/styles';
import {
  CssBaseline, Box, Toolbar, ListItem, ListItemAvatar, ListItemText, Avatar,
} from '@mui/material/';
import Sidebar from '../components/Sidebar';
import Patientboard from '../components/patientboard';
import user1 from '../components/images/user1.jpg';
import ChatContainerModal from '../components/chat/ChatContainerModal';
import userInfo from '../services/userInfo';

const getInitialState = () => {
  if (useLocation().state !== null) {
    return {
      name: useLocation().state.name,
      role: useLocation().state.role,
      hin: useLocation().state.hin,
      id: useLocation().state.id,
    };
  }
  return {
    name: 'N/A', role: 'N/A', hin: '0', id: '',
  };
};

function DashboardContent() {
  const [nam, setnam] = useState(null);
  const { name } = getInitialState();
  const welcomeMessage = `Hello, ${nam}`;
  const { role } = getInitialState();
  // const greeting = `Nice to see you back, ${role}`;
  const { hin } = getInitialState();
  const { id } = getInitialState();
  const infoSaved = { nameSaved: `${name}`, roleSaved: `${role}`, hinSaved: `${hin}` };

  // These are the states that control the ChatContainerModal visibility
  const [chatTargetId, setChatTargetId] = React.useState('');
  const [openChatModal, setOpenChatModal] = React.useState(false);
  const handleOpenChatModal = () => setOpenChatModal(true);
  const handleCloseChatModal = () => setOpenChatModal(false);

  useEffect(() => {
    async function fetchMyAPI() {
      const namee = localStorage.getItem('name');
      setnam(namee);
      const response = await userInfo.getUser(id);
      const patientsDoctorId = response.data.doctorId;
      setChatTargetId(patientsDoctorId);
    }
    fetchMyAPI();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>

      <CssBaseline />
      <Sidebar handleChatOpen={handleOpenChatModal} isChatEnabled />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'light'
            ? theme.palette.white
            : theme.palette.white),
          flexGrow: 1,
          height: '200vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Box>
          {nam
              && (
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
        <Patientboard data={infoSaved} />
      </Box>
      <ChatContainerModal
        handleChatClose={handleCloseChatModal}
        open={openChatModal}
        chatTargetId={chatTargetId}
      />
    </Box>

  );
}
export default function Dashboard() {
  return <DashboardContent />;
}
