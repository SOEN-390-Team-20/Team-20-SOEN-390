import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import {
  Box, Divider, Paper, Grid, Button, Stack,
} from '@mui/material/';
import ChatContainerModal from '../components/chat/ChatContainerModal';
import Sidebar from '../components/Sidebar';
import doctorPatients from '../services/doctorPatients';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Patientlist() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  let patientsCounter = 0;

  // These are the states that control the ChatContainerModal visibility
  const [openChatModal, setOpenChatModal] = React.useState(false);
  const handleOpenChatModal = () => setOpenChatModal(true);
  const handleCloseChatModal = () => setOpenChatModal(false);

  useEffect(() => {
    async function fetchMyAPI() {
      const storedEmail = localStorage.getItem('email');
      const storedName = localStorage.getItem('name');
      const getPatientsResponse = await doctorPatients.getPatients({ storedEmail });
      setPatients(getPatientsResponse.data);
      setName(storedName);
      console.log(name);
      console.log(patients);
    }
    fetchMyAPI();
  }, []);
  return (
    <>
      <Sidebar />
      <h1> Your Patients</h1>
      <Box sx={{ width: '80%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginBottom="25px">

          {patients && patients.map((patient) => (
            <Grid item xs={6}>

              <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
                <h2 style={{ color: '#00296B' }}>
                  {' '}
                  Patient

                  {++patientsCounter}
                </h2>

                <Divider
                  style={{ background: '#00296B' }}
                  variant="middle"
                  sx={{ borderBottomWidth: 4 }}
                />
                <h3>
                  {` ${patient.firstName} ${patient.lastName}`}
                </h3>
                <br />
                <h3>
                  Last check in:
                  {` ${patient.lastUpdate}`}
                </h3>
                <h3>
                  Status:
                  {` ${patient.covidStatus}`}
                </h3>
                <h3>
                  Vaccinated:
                  {` ${patient.vaccinationstatus}`}
                </h3>
                <h3>
                  Upcoming appts: none
                </h3>
                <Stack
                  spacing={2}
                  direction="row"
                  alignItems="center"
                  justify="center"
                  style={{ minHeight: '10vh' }}
                  justifyContent="center"
                  overflow="auto"
                >
                  <Button variant="contained" onClick={handleOpenChatModal}>View</Button>
                  <Button variant="contained">Chat</Button>
                  <Button variant="contained">Book Appt</Button>
                </Stack>
              </Item>
            </Grid>
          ))}
        </Grid>
        <ChatContainerModal handleChatClose={handleCloseChatModal} open={openChatModal} />
      </Box>
    </>
  );
}
export default Patientlist;
