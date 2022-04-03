import React from 'react';
// import { useLocation } from 'react-router-dom';
import {
  Box,
  List,
  Typography,
} from '@mui/material';

import Navbar from '../components/Navbar';
import SymptomModal from '../components/historySymptoms/SymptomModal';
/* import historyService from '../services/historySymptom';

const getInitialHINState = () => {
  if (useLocation().state !== null) {
    return {
      hin: useLocation().state.hin,
    };
  }
  return { hin: '0' };
}; */

function HistorySymptoms() {
  /* const { hin } = getInitialHINState();
  const [data, setData] = useState([]);
  useEffect(() => {
    getHistory();
  }, []);

  async function getHistory() {
    await historyService.getList(hin).then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.error('Error' + error);
    });
  } */

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <Typography variant="h2" style={{ color: '#00296B' }}>
        Symptoms History
      </Typography>
      <br />
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <List
          sx={{
            position: 'relative',
            overflow: 'auto',
            maxHeight: 700,
          }}
        >
          { /* Need to Loop ListItem for each symptom data from the GET request */ }
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
          <SymptomModal />
        </List>
      </Box>
    </>
  );
}

export default HistorySymptoms;
