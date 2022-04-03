/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper, Container } from '@mui/material';
import adminService from '../services/admin';
import Navbar from '../components/Navbar';

function ListUsers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);


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
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex", width: '90%' }}>
        <CssBaseline />
        <Navbar />
        <Container
          sx={{ mt: 10, mb: 6 }}
          style={{ paddingTop: "50px", width: '90%' }}
        >
          <Item sx={{ boxShadow: 10, padding: '50px' }}>
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
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default ListUsers;
