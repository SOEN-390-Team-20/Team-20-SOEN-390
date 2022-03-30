import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Paper, Divider, Container, Grid, Button, Typography, List, ListItem, ListItemText, ListItemAvatar,
} from '@mui/material/';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { blue } from '@mui/material/colors';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import map1 from './images/location-tracking-gps.jpg';

export default function Patientboard() {
  const navigate = useNavigate();
  const goCheckIn = () => {
    navigate('/checkIn');
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
    <Container maxWidth="lg">
      <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
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

            <Button variant="contained" style={{ bottom: 3, left: 200, color: '#00296B !important' }} onClick={goCheckIn}>
              <Typography style={{ color: '#FFFFFF' }}>Fill </Typography>
              <NavigateNextIcon style={{ color: '#FFFFFF' }} />
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6} color={primary}>
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
            <Button variant="contained" style={{ bottom: 3, left: 180, color: '#00296B !important' }}>
              <Typography style={{ color: '#FFFFFF' }}>Book Now </Typography>
              <NavigateNextIcon style={{ color: '#FFFFFF' }} />
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}>Track Your Location</h1>
            <Divider
              style={{ background: '#00296B' }}
              variant="middle"
              sx={{ borderBottomWidth: 4 }}
            />
            <img src={map1} alt="map" width="500px" height="250px" />
            <br />
            <Button variant="contained" style={{ bottom: 4, left: 200, color: '#00296B !important' }}>
              <Typography style={{ color: '#FFFFFF' }}>Track </Typography>
              <NavigateNextIcon style={{ color: '#FFFFFF' }} />
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}> Vaccination Status</h1>

            <Divider
              style={{ background: '#00296B ' }}
              variant="middle"
              sx={{ borderBottomWidth: 4 }}
            />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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

            <Button variant="contained" style={{ bottom: -75, left: 180, color: '#00296B !important' }}>
              <Typography style={{ color: '#FFFFFF' }}>More Info </Typography>
              <NavigateNextIcon style={{ color: '#FFFFFF' }} />
            </Button>
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
