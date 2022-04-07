import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Paper, Divider, Container, Grid, Button, Typography, List,
  ListItem, ListItemText, ListItemAvatar, Stack,
} from '@mui/material/';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { blue } from '@mui/material/colors';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import map1 from './images/location-tracking-gps.jpg';

export default function Patientboard(props) {
  const navigate = useNavigate();
  const { data } = props;
  const goCheckIn = () => {
    navigate('/checkIn', { state: { name: data.nameSaved, role: data.roleSaved, hin: data.hinSaved } });
  };
  const goHistory = () => {
    navigate('/historySymptoms', { state: { name: data.nameSaved, role: data.roleSaved, hin: data.hinSaved } });
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),

    textAlign: 'center',
  }));
  const percentage = 66;

  const primary = blue;

  return (
    <Container maxWidth="90">
      <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 6 }} marginBottom="45px">
        <Grid item xs={4} color={primary}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}>Vaccine Status</h1>
            <iframe style={{ width: '100%', borderRadius: '25px' }} title="Vaccine Status" src="https://covid19canada.maps.arcgis.com/apps/opsdashboard/index.html#/2772c0489f43411ca9493fc5888fbe67" height="550" width="100%" />
          </Item>
        </Grid>
        <Grid item xs={4} color={primary}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}>Populations Dose</h1>
            <iframe style={{ width: '100%', borderRadius: '25px' }} title="Population's Dose" src="https://covid19canada.maps.arcgis.com/apps/opsdashboard/index.html#/cfbd8528810042d38d4e184e6731f2f9" height="550" width="100%" />
          </Item>
        </Grid>
        <Grid item xs={4} color={primary}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}>Daily trends</h1>
            <iframe style={{ width: '100%', borderRadius: '25px' }} title="Daily Cases Statistics" src="https://covid19canada.maps.arcgis.com/apps/opsdashboard/index.html#/7856c4762c7443bab2caba8b3c16af64" height="550" width="100%" />
          </Item>
        </Grid>
        <Grid item xs={6} sm={6} height={200}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}> Your Conditions</h1>

            <Divider
              style={{ background: '#00296B' }}
              variant="middle"
              sx={{ borderBottomWidth: 4 }}
            />

            <h3>Fill out the daily check in for your doctor!</h3>
            <div style={{ width: 100, height: 40 }}>
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  pathColor: `rgba(0, 41, 107, ${percentage / 100})`,
                  textColor: '#00296B',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#00296B !important',
                })}

              />

            </div>
            <br />
            <Stack direction="row" spacing={2} justifyContent="right">
              <Button variant="contained" style={{ bottom: 3, background: '#00296B' }} onClick={goHistory}>
                <Typography style={{ color: '#FFFFFF' }}>History </Typography>
                <NavigateNextIcon style={{ color: '#FFFFFF' }} />
              </Button>

              <Button variant="contained" style={{ bottom: 3, background: '#00296B' }} onClick={goCheckIn}>
                <Typography style={{ color: '#FFFFFF' }}>Fill </Typography>
                <NavigateNextIcon style={{ color: '#FFFFFF' }} />
              </Button>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={10} sm={6} color={primary}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}>Your Appointments</h1>
            <Divider
              style={{ background: '#00296B' }}
              variant="middle"
              sx={{ borderBottomWidth: 4 }}
            />
            <h3>No upcoming Appointments</h3>
            <br />
            <br />
            <br />
            <Stack direction="row" justifyContent="right">
              <Button variant="contained" style={{ bottom: 3, background: '#00296B' }}>
                <Typography style={{ color: '#FFFFFF' }}>Book Now </Typography>
                <NavigateNextIcon style={{ color: '#FFFFFF' }} />
              </Button>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}>Track Your Location</h1>
            <Divider
              style={{ background: '#00296B' }}
              variant="middle"
              sx={{ borderBottomWidth: 4 }}
            />
            <img src={map1} alt="map" width="60%" />
            <br />
            <Stack direction="row" justifyContent="right">
              <Button variant="contained" style={{ bottom: 3, background: '#00296B' }}>
                <Typography style={{ color: '#FFFFFF' }}>Track </Typography>
                <NavigateNextIcon style={{ color: '#FFFFFF' }} />
              </Button>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}> Vaccination Status</h1>

            <Divider
              style={{ background: '#00296B ' }}
              variant="middle"
              sx={{ borderBottomWidth: 4 }}
            />
            <List sx={{ maxWidth: 360, maxHeight: 150, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>

                  <CheckCircleIcon style={{ color: '#00FF00' }} />

                </ListItemAvatar>
                <ListItemText primary="First Dose" secondary="Jan 9, 2020" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>

                  <DoNotDisturbIcon style={{ color: '#FF0000' }} />

                </ListItemAvatar>
                <ListItemText primary="Second Dose" secondary="TBA" />
              </ListItem>
              <ListItem />
            </List>

            <Stack direction="row" justifyContent="right">
              <br />
              <br />
              <Button variant="contained" style={{ bottom: -95, background: '#00296B' }}>
                <Typography style={{ color: '#FFFFFF' }}>More Info </Typography>
                <NavigateNextIcon style={{ color: '#FFFFFF' }} />
              </Button>
            </Stack>
            <br />
            <br />
            <br />
            <br />
            <br />
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}
