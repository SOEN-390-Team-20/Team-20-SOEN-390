import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import {
  Box, Divider, Paper, Grid, Button, Stack,
} from '@mui/material/';

import Sidebar from '../components/Sidebar';
import doctorLogin from '../services/doctorLogin';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Patientlist() {
  const [pat, setpat] = useState(null);
  const [nam, setnam] = useState(null);
  let integ = 0;

  useEffect(() => {
    async function fetchMyAPI() {
      const email = localStorage.getItem('email');
      const namee = localStorage.getItem('name');
      const patientsl = await doctorLogin.login({ email });
      setpat(patientsl.data);
      setnam(namee);
      console.log(nam);
      console.log(patientsl);
    }

    fetchMyAPI();
    console.log('hola todos');
  }, []);
  return (
    <>
      <Sidebar />
      <h1> Your Patients</h1>
      <Box sx={{ width: '80%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginBottom="25px">

          {pat && pat.map((element) => (
            <Grid item xs={6}>

              <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
                <h2 style={{ color: '#00296B' }}>
                  {' '}
                  Patient

                  {++integ}
                </h2>

                <Divider
                  style={{ background: '#00296B' }}
                  variant="middle"
                  sx={{ borderBottomWidth: 4 }}
                />
                <h3>
                  {` ${element.firstName} ${element.lastName}`}
                </h3>
                <br />
                <h3>
                  Last check in:
                  {` ${element.lastUpdate}`}
                </h3>
                <h3>
                  Status:
                  {` ${element.covidStatus}`}
                </h3>
                <h3>
                  Vaccinated:
                  {` ${element.vaccinationstatus}`}
                </h3>
                <h3>
                  Upcomign appts: none
                </h3>
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
          ))}

        </Grid>
      </Box>
    </>
  );
}
export default Patientlist;
