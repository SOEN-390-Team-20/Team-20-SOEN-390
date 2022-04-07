/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
   BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar
} from 'recharts';
import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Paper, Grid, Divider, Box } from '@mui/material';
import adminService from '../services/admin';
import Sidebar from '../components/Sidebar';
import user1 from '../components/images/user1.jpg';
import doctorLogin from '../services/doctorLogin';



function ListUsers() {
  const [data, setData] = useState([]);
  const [accountData, setAccount]=useState(null);
  useEffect(() => {
    getUsers();
    fetchMyAPI();
  }, []);
 
  async function fetchMyAPI() {
    const email = localStorage.getItem('email');
    const num = 0;
    const patientsl = await doctorLogin.login({ email, num });
    setAccount(patientsl.data)

  }
  async function getUsers() {
    await adminService.getAll().then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.error('Error' + error);
    });
  }

  async function handleDeleteUser(id) {
    await adminService.deleteUser(id)
    window.location.reload();
  };

  const userRows = [];

  let counter = 0;

  for (let item of data) {
    const buttonName = `delete-button-${counter}`;
    
    const row = (
      <tr key={item._id}>
        <td key={1}>{ item._id }</td>
        <td key={2}>{ `${item.firstName || ''} ${item.lastName || ''}` }</td>
        <td key={3}>{ item.email }</td>
        <td key={4}>{ item.role }</td>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <button name={ buttonName } onClick={() => handleDeleteUser(item._id)}>Delete</button>
      </tr>
    );
    counter++;
    userRows.push(row);
  }

  const mdTheme = createTheme();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));
  
  const d = [
    {
      "name": "Doctors",
      "users": 4000,
      
    },
    {
      "name": "Patients",
      "users": 3000,
      
    },
    {
      "name": "Admin",
      "users": 2000,
      
    }
    
    
  ]
  return (
    <>
      <CssBaseline />
        <Sidebar />
        <Box sx={{flexGrow:11, maxWidth:3000 }}>
          <Grid container spacing={2}>
        <Grid item xs={7}>
        <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}> Active user trends</h1>

            <Divider
              style={{ background: '#00296B' }}
              variant="middle"
              sx={{ borderBottomWidth: 4 }}
            />
            <br />
            <br />
            <br />
            <br />
            <BarChart width={500} height={250} data={d}>
  <CartesianGrid strokeDasharray="2 2" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  
  <Bar dataKey="users" fill="#82ca9d" />
</BarChart>
          
          </Item>
       </Grid>
       <Grid item xs={5}>
          <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            
            <ListItem>
                  <ListItemAvatar>
                    <Avatar
        alt="Remy Sharp"
        src={user1}
        sx={{ width: 106, height: 106 }}
              />
                  </ListItemAvatar>
                  <ListItemText>
                    <h1 style={{ color: '#00296B' }}> Profile</h1>
                  </ListItemText>
                    
                  
                </ListItem>
            <Divider
              style={{ background: '#00296B' }}
              variant="middle"
              sx={{ borderBottomWidth: 4 }}
            />
            <h2 style={{ color: '#00296B' }}>Welcome back Admin! </h2>{accountData&&<Grid item xs={3}>
<h3 style={{ color: '#00296B' }}>First name:  {accountData.firstName}</h3>
<h3 style={{ color: '#00296B' }}>
  Last name: {accountData.lastName}
</h3>
<h3 style={{ color: '#00296B' }}>Email:{accountData.email}</h3>
<h3 style={{ color: '#00296B' }}>ID:{accountData._id}</h3>
<h3 style={{ color: '#00296B' }}> Date:{Date.now().toString()}</h3>

              </Grid>}
            
              <br/>
              
      </Item>
          </Grid>

        <Grid item xs={19}>
        <Item sx={{ boxShadow: 10, borderRadius: '25px' }}>
            <h1 style={{ color: '#00296B' }}> List of Users</h1>
            <Divider
              style={{ background: '#00296B' }}
              variant="middle"
              sx={{ borderBottomWidth: 4 }}
            />
            <br />
            <table style={{ marginLeft: 'auto', marginRight: 'auto', width: '90%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {userRows}
              </tbody>
            </table>
            </Item>
            
        </Grid>
       </Grid>
      </Box>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default ListUsers;
