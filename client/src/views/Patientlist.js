import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box, Divider, Paper, Grid, Button, Stack,
} from '@mui/material/';

import Sidebar from '../components/Sidebar';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Patientlist() {
  return (
    <>
      <Sidebar />
      <h1> Your Patients</h1>
      <Box sx={{ width: '80%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
              <h2 style={{ color: '#00296B' }}> Patient 1</h2>

              <Divider
                style={{ background: '#00296B' }}
                variant="middle"
                sx={{ borderBottomWidth: 4 }}
              />
              <h3>
                Noor Hammodi
              </h3>
              <br />
              <h3>Last check in: March 16 at 3:00pm</h3>
              <h3>Status:neg</h3>
              <h3>Vaccinated: 2nd dose</h3>
              <h3>Upcomign appts: none</h3>
              <Stack
                spacing={3}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: '10vh' }}
              >
                <Button variant="contained">View</Button>
                <Button variant="contained">Chat</Button>
                <Button variant="contained">Book Appt</Button>
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
              <h2 style={{ color: '#00296B' }}> Patient 1</h2>

              <Divider
                style={{ background: '#00296B' }}
                variant="middle"
                sx={{ borderBottomWidth: 4 }}
              />
              <h3>
                Noor Hammodi
              </h3>
              <br />
              <h3>Last check in: March 16 at 3:00pm</h3>
              <h3>Status:neg</h3>
              <h3>Vaccinated: 2nd dose</h3>
              <h3>Upcomign appts: none</h3>
              <Stack
                spacing={3}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: '10vh' }}
              >
                <Button variant="contained">View</Button>
                <Button variant="contained">Chat</Button>
                <Button variant="contained">Book Appt</Button>
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
              <h2 style={{ color: '#00296B' }}> Patient 1</h2>

              <Divider
                style={{ background: '#00296B' }}
                variant="middle"
                sx={{ borderBottomWidth: 4 }}
              />
              <h3>
                Noor Hammodi
              </h3>
              <br />
              <h3>Last check in: March 16 at 3:00pm</h3>
              <h3>Status:neg</h3>
              <h3>Vaccinated: 2nd dose</h3>
              <h3>Upcomign appts: none</h3>
              <Stack
                spacing={3}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: '10vh' }}
              >
                <Button variant="contained">View</Button>
                <Button variant="contained">Chat</Button>
                <Button variant="contained">Book Appt</Button>
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
              <h2 style={{ color: '#00296B' }}> Patient 1</h2>

              <Divider
                style={{ background: '#00296B' }}
                variant="middle"
                sx={{ borderBottomWidth: 4 }}
              />
              <h3>
                Noor Hammodi
              </h3>
              <br />
              <h3>Last check in: March 16 at 3:00pm</h3>
              <h3>Status:neg</h3>
              <h3>Vaccinated: 2nd dose</h3>
              <h3>Upcomign appts: none</h3>
              <Stack
                spacing={3}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: '10vh' }}
              >
                <Button variant="contained">View</Button>
                <Button variant="contained">Chat</Button>
                <Button variant="contained">Book Appt</Button>
              </Stack>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default Patientlist;
