import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
// import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import LogoutIcon from '@mui/icons-material/Logout';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
// import logoo from '../components/images/BellLogo.png';
import Navbar from '../components/Navbar';

const getInitialNameState = () => {
  if (useLocation().state !== null) {
    return { name: useLocation().state.name, role: useLocation().state.role };
  }
  return { name: 'N/A', role: 'N/A' };
};
function DashboardContent() {
  const navigate = useNavigate();
  const goCheckIn = () => {
    navigate('/checkIn');
  };
  const goListUsers = () => {
    navigate('/listUsers');
  };
  const primary = blue;
  const { name } = getInitialNameState();
  const welcomeMessage = `Hello, ${name}`;
  const mdTheme = createTheme();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),

    textAlign: 'center',
  }));
  // console.log(logo);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar />
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
          <Typography variant="h2" style={{ color: '#00296B' }}>
            {welcomeMessage}
          </Typography>
          {getInitialNameState().role === 'admin'
            ? (
              <Button name="admin-button" variant="contained" style={{ bottom: 3, color: '#00296B' }} onClick={goListUsers}>
                <Typography style={{ color: '#FFFFFF' }}>See Users </Typography>
                <NavigateNextIcon style={{ color: '#FFFFFF' }} />
              </Button>
            )
            : ''}

          <Container maxWidth="lg" sx={{ mt: 10, mb: 6 }}>
            <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
              <Grid item xs={6} sm={6} height={200}>
                <Item sx={{ boxShadow: 10 }}>
                  <h1 style={{ color: '#00296B' }}> Your Condition</h1>
                  <Divider
                    style={{ background: '#00296B' }}
                    variant="middle"
                    sx={{ borderBottomWidth: 4 }}
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />

                  <Button variant="contained" style={{ bottom: 3, left: 200, color: '#00296B' }} onClick={goCheckIn}>
                    <Typography style={{ color: '#FFFFFF' }}>Next </Typography>
                    <NavigateNextIcon style={{ color: '#FFFFFF' }} />
                  </Button>
                </Item>
              </Grid>
              <Grid item xs={6} color={primary}>
                <Item sx={{ boxShadow: 10 }}>
                  <h1 style={{ color: '#00296B' }}>Your Appointments</h1>
                  <Divider
                    style={{ background: '#00296B' }}
                    variant="middle"
                    sx={{ borderBottomWidth: 4 }}
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Button variant="contained" style={{ bottom: 3, left: 200, color: '#00296B' }}>
                    <Typography style={{ color: '#FFFFFF' }}>Next </Typography>
                    <NavigateNextIcon style={{ color: '#FFFFFF' }} />
                  </Button>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ boxShadow: 10 }}>
                  <h1 style={{ color: '#00296B' }}>Track Your Location</h1>
                  <Divider
                    style={{ background: '#00296B' }}
                    variant="middle"
                    sx={{ borderBottomWidth: 4 }}
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Button variant="contained" style={{ bottom: 3, left: 200, color: '#00296B' }}>
                    <Typography style={{ color: '#FFFFFF' }}>Next </Typography>
                    <NavigateNextIcon style={{ color: '#FFFFFF' }} />
                  </Button>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ boxShadow: 10 }}>
                  <h1 style={{ color: '#00296B' }}> Vaccination Status</h1>

                  <Divider
                    style={{ background: '#00296B' }}
                    variant="middle"
                    sx={{ borderBottomWidth: 4 }}
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Button variant="contained" style={{ bottom: 3, left: 200, color: '#00296B' }}>
                    <Typography style={{ color: '#FFFFFF' }}>Next </Typography>
                    <NavigateNextIcon style={{ color: '#FFFFFF' }} />
                  </Button>
                </Item>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default function Dashboard() {
  return <DashboardContent />;
}
