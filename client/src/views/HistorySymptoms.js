import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Checkbox,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import Sidebar from '../components/Sidebar';
// import SymptomModal from '../components/historySymptoms/SymptomModal';
import historyService from '../services/historySymptom';

const getInitialState = () => {
  if (useLocation().state !== null) {
    return {
      name: useLocation().state.name,
      role: useLocation().state.role,
      hin: useLocation().state.hin,
    };
  }
  return { name: 'N/A', role: 'N/A', hin: '12' };
};

function HistorySymptoms() {
  const { hin } = getInitialState();
  const [data, setData] = useState([]);
  console.log(`hin: ${hin}`);

  async function getHistory() {
    await historyService.getList().then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.error(`Error, ${error}`);
    });
  }

  useEffect(() => {
    getHistory();
  }, []);

  function createData(
    feverOrChills,
    temperature,
    suddenLossOfSenseOfSmellAndTaste,
    difficultyBreathingOrShortnessOfBreath,
    cough,
    runnyOrStuffyNose,
    outsideCanadaTravellingInPast14Days,
    closeContactWithSuspectedCase,
    unusualSevereFatigue,
    unusualHeadache,
    significantLossOfAppetite,
    unusualOrUnexplainedMusclePainOrStiffness,
    soreThroatWithoutObviousCause,
    createdAt,
  ) {
    return {
      feverOrChills,
      temperature,
      suddenLossOfSenseOfSmellAndTaste,
      difficultyBreathingOrShortnessOfBreath,
      cough,
      runnyOrStuffyNose,
      outsideCanadaTravellingInPast14Days,
      closeContactWithSuspectedCase,
      unusualSevereFatigue,
      unusualHeadache,
      significantLossOfAppetite,
      unusualOrUnexplainedMusclePainOrStiffness,
      soreThroatWithoutObviousCause,
      createdAt,
    };
  }

  const dataRows = [];

  data.forEach((item) => {
    if (item.hin === hin) {
      dataRows.push(
        createData(
          item.feverOrChills,
          item.temperature,
          item.suddenLossOfSenseOfSmellAndTaste,
          item.difficultyBreathingOrShortnessOfBreath,
          item.cough,
          item.runnyOrStuffyNose,
          item.outsideCanadaTravellingInPast14Days,
          item.closeContactWithSuspectedCase,
          item.unusualSevereFatigue,
          item.unusualHeadache,
          item.significantLossOfAppetite,
          item.unusualOrUnexplainedMusclePainOrStiffness,
          item.soreThroatWithoutObviousCause,
          item.createdAt,
        ),
      );
    }
  });

  console.log(dataRows);

  function formatDate(date) {
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d = new Date(date);
    const day = d.getDate();
    const month = monthName[d.getMonth()];
    const year = d.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  }

  return (
    <>
      <Sidebar />
      <br />
      <br />
      <Typography variant="h2" style={{ color: '#00296B' }}>
        Symptoms History
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Fever</TableCell>
              <TableCell align="right">Temperature</TableCell>
              <TableCell align="right">Loss Of Smell And Taste</TableCell>
              <TableCell align="right">Difficulty Breathing</TableCell>
              <TableCell align="right">Cough</TableCell>
              <TableCell align="right">Runny or Stuffy Nose</TableCell>
              <TableCell align="right">Outside of Canada</TableCell>
              <TableCell align="right">Close Contact</TableCell>
              <TableCell align="right">Unusual Severe Fatigue</TableCell>
              <TableCell align="right">Unusual Headache</TableCell>
              <TableCell align="right">Loss Of Appetite</TableCell>
              <TableCell align="right">Unexplained Muscle Pain</TableCell>
              <TableCell align="right">Sore Throat Without Obvious Cause</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRows.map((row) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {formatDate(row.createdAt)}
                </TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.feverOrChills} color="secondary" />
                </TableCell>
                <TableCell align="right">{row.temperature}</TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.suddenLossOfSenseOfSmellAndTaste} />
                </TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.difficultyBreathingOrShortnessOfBreath} />
                </TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.cough} />
                </TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.runnyOrStuffyNose} />
                </TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.outsideCanadaTravellingInPast14Days} />
                </TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.closeContactWithSuspectedCase} />
                </TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.unusualSevereFatigue} />
                </TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.unusualHeadache} />
                </TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.significantLossOfAppetite} />
                </TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.unusualOrUnexplainedMusclePainOrStiffness} />
                </TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.soreThroatWithoutObviousCause} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default HistorySymptoms;
