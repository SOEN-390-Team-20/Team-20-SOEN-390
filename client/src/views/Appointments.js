import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
// import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import doctorPatients from '../services/doctorPatients';
import Sidebar from '../components/Sidebar';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Appointments() {
  const [rows, setpat] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      const email = localStorage.getItem('email');
      const patientsl = await doctorPatients.getPatients({ email });
      setpat(patientsl.data);
    }
    fetchMyAPI();
  }, []);

  return (
    <>
      <Sidebar />
      <h1
        style={{
          color: '#00296B', clear: 'left', textAlign: 'left',
        }}

      >
        {' '}
        Your Appointments
      </h1>
      <Box
        sx={{
          width: '85%',
          height: '60%',
          boxShadow: 10,
          borderRadius: '25px',
        }}
      >
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 700, justifyContent: 'center', align: 'center', width: '..', height: '..',
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">last appointement</StyledTableCell>
                <StyledTableCell align="right">Location</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows.map((row) => (
                <StyledTableRow key={row.firstName}>
                  <StyledTableCell component="th" scope="row">
                    {`${row.firstName} ${row.lastName}`}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.lastUpdate}</StyledTableCell>
                  <StyledTableCell align="right">in office</StyledTableCell>
                  <StyledTableCell align="right">{row.covidStatus}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.action}
                    <Stack spacing={2} direction="row-reverse">
                      <Button variant="outlined">Previous</Button>
                      <Button variant="outlined">Next</Button>
                    </Stack>

                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </>
  );
}
export default Appointments;
