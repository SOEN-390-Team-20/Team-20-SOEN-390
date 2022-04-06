import * as React from 'react';
import QRCode from 'qrcode';
import { useState, useEffect } from 'react';
import {
  Grid, Divider, Paper, Box,
} from '@mui/material/';
import { styled } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';
import doctorLogin from '../services/doctorLogin';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function QRcode() {
const [src, setSrc] = useState(null);
useEffect(()=>{

  async function fetchMyAPI() {
    const email = localStorage.getItem('email');
    const num=0;
    const patientsl = await doctorLogin.login({ email, num });
    
  
    console.log(patientsl);
    QRCode.toDataURL(JSON.stringify({
      firstName:patientsl.data.firstName,
      lasttName:patientsl.data.lastName,                  
      vaccineDoses:patientsl.data.vaccinationstatus,
      covidStatus:patientsl.data.covidStatus,
      selfQuarantine:patientsl.data.selfQuarantine
    })).then((data)=>{

      setSrc(data)
  
  })}
fetchMyAPI()

},[])

  return (
    <>

      <Sidebar />
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={10}>
            <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
              <h1 style={{ color: '#00296B' }}> QR Code...</h1>
               <div>
                 {src&&<img src={src}/>}
               </div>

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
