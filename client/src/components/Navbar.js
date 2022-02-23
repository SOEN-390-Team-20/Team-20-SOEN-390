import * as React from 'react';
import {
// AppBar,
// Box,
  Toolbar,
  Typography,
  Button,
// IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import MuiAppBar from '@mui/material/AppBar';
import logoo from './images/BellLogo.png';
// import MenuIcon from '@mui/icons-material/Menu';
function Navbar() {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    ...(open && {
      marginLeft: 0,
      width: `calc(100% - ${0}px)`,
    }),
  }));

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <AppBar position="absolute" style={{ background: '#FFF' }}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <img src={logoo} alt="Logo" width="60" height="60" />
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
          style={{ color: '#00296B' }}
        >
          JeVaisBienAller
          <br />
          <Typography style={{ color: '#FDC500' }}>Covid tracker </Typography>
        </Typography>

        <Button variant="contained" style={{ color: '#00296B' }} onClick={handleLogout}>
          <LogoutIcon style={{ color: '#FFFFFF' }}> </LogoutIcon>
          <Typography style={{ color: '#FFFFFF' }}>Logout </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export default function myNavbar() {
  return <Navbar />;
}
