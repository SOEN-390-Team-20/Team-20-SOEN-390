import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Grid, Divider, Container, Paper, Button, List, ListItemIcon, ListItem,
  ListItemButton, ListItemText,
} from '@mui/material/';
import DateRangeIcon from '@mui/icons-material/DateRange';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { indigo } from '@mui/material/colors';
// import CircleIcon from '@mui/icons-material/Circle';
// import { textAlign } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import Doctorchart from './doctorchart';

/* function createData(element) {
  const temp = {
    name: `${element.firstName} ${element.lastName}`, age: ' ', sex: ' ', weight: ' ',
     lastappointment: ' ',
  };
  return temp;
}
  eslint-disable  react/destructuring-assignment */
// function createData(name, age, sex, weight, lastappointment) {
//   return {
//     name, age, sex, weight, lastappointment,
//   };
// }

// const rows = [
//   createData('John Smith', 5, 6.0, 24, 4.0),
// ];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const primary = indigo;

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[900]),
  backgroundColor: indigo[900],
  '&:hover': {
    backgroundColor: indigo[50],
  },
}));

function Doctorboard(props) {
  const navigate = useNavigate();
  const goappt = () => {
    navigate('/appointment');
  };
  const gopatient = () => {
    navigate('/patientlist');
  };
  return (
    <Container maxWidth="200%">
      <Grid container spacing={20} rowSpacing={6} columnSpacing={30}>
        <br />
        <Grid item xs={10}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}> Patients profile</h1>

            <Divider
              style={{ background: '#00296B' }}
              variant="middle"
              sx={{ borderBottomWidth: 4 }}
            />
            <br />
            <Doctorchart />
          </Item>
        </Grid>
        <Grid item xs={1} md={5}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}> Your Patients</h1>

            <Divider
              style={{ background: '#00296B' }}
              variant="middle"
              sx={{ borderBottomWidth: 4 }}
            />
            <List
              sx={{
                width: '100%', maxWidth: 580, bgcolor: 'background.paper', color: '#00296B',
              }}
            >

              {props.listOfPatients.map((element) => (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={`${element.firstName} ${element.firstName}`} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <ColorButton
              onClick={gopatient}
              variant="contained"
              endIcon={<SendIcon />}
              style={{
                bottom: 10,
                marginRight: -420,

              }}

            >
              More Info
            </ColorButton>
          </Item>
        </Grid>
        <Grid item xs={3} md={5} alignItems="stretch" color={primary}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}>Your Appointments</h1>
            <Divider
              style={{ background: '#00296B' }}
              variant="middle"
              sx={{ borderBottomWidth: 4 }}
            />
            <List
              sx={{
                width: '100%', maxWidth: 580, bgcolor: 'background.paper', color: '#00296B',
              }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {' '}
                    <DateRangeIcon style={{ color: '#00296B' }} />
                  </ListItemIcon>
                  <ListItemText primary="March 16, 2022" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {' '}
                    <DateRangeIcon style={{ color: '#00296B' }} />
                  </ListItemIcon>
                  <ListItemText primary="March 16, 2022" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {' '}
                    <DateRangeIcon style={{ color: '#00296B' }} />
                  </ListItemIcon>
                  <ListItemText primary="March 16, 2022" />
                </ListItemButton>
              </ListItem>
            </List>
            <ColorButton
              variant="contained"
              onClick={goappt}
              endIcon={<SendIcon />}
              style={{
                bottom: 10,
                marginRight: -420,

              }}

            >
              More Info
            </ColorButton>

          </Item>
        </Grid>

      </Grid>
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
}
export default Doctorboard;
