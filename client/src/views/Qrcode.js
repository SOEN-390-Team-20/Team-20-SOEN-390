import * as React from 'react';
import {
  Grid, Divider, Paper, Box,
} from '@mui/material/';
import { styled } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function QRcode() {
  return (
    <>

      <Sidebar />
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={10}>
            <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
              <h1 style={{ color: '#00296B' }}> QR Code...</h1>

              <Divider
                style={{ background: '#00296B' }}
                variant="middle"
                sx={{ borderBottomWidth: 4 }}
              />
              <br />

            </Item>
          </Grid>

        </Grid>
      </Box>
    </>
  );
}
export default QRcode;
