import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import checkInService from '../services/checkIn';
import Navbar from '../components/Navbar';

const getInitialHINState = () => {
  if (useLocation().state !== null) {
    return {
      hin: useLocation().state.hin,
    };
  }
  return { hin: '0' };
};

function DailyCheckIn() {
  const navigate = useNavigate();
  const [feverOrChills, setFever] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [suddenLossOfSenseOfSmellAndTaste, setLossOfSmellAndTaste] = useState(false);
  const [difficultyBreathingOrShortnessOfBreath, setDifficultyBreathing] = useState(false);
  const [cough, setCough] = useState(false);
  const [runnyOrStuffyNose, setRunnyNose] = useState(false);
  const [outsideCanadaTravellingInPast14Days, setPast14Days] = useState(false);
  const [closeContactWithSuspectedCase, setCloseContact] = useState(false);
  const [unusualSevereFatigue, setSevereFtigue] = useState(false);
  const [unusualHeadache, setHeadache] = useState(false);
  const [significantLossOfAppetite, setLossOAappetite] = useState(false);
  const [unusualOrUnexplainedMusclePainOrStiffness, setMusclePain] = useState(false);
  const [soreThroatWithoutObviousCause, setSoreThroat] = useState(false);
  const { hin } = getInitialHINState();

  const handleFeverChange = ({ target }) => setFever(target.checked);
  const handleTemperatureChange = ({ target }) => setTemperature(target.value);
  const handleLossOfSmellAndTasteChange = ({ target }) => setLossOfSmellAndTaste(target.checked);
  const handleDifficultyBreathingChange = ({ target }) => setDifficultyBreathing(target.checked);
  const handleCoughChange = ({ target }) => setCough(target.checked);
  const handleRunnyNoseChange = ({ target }) => setRunnyNose(target.checked);
  const handlePast14DaysChange = ({ target }) => setPast14Days(target.checked);
  const handleCloseContactChange = ({ target }) => setCloseContact(target.checked);
  const handleSevereFtigueChange = ({ target }) => setSevereFtigue(target.checked);
  const handleHeadacheChange = ({ target }) => setHeadache(target.checked);
  const handleLossOAappetiteChange = ({ target }) => setLossOAappetite(target.checked);
  const handleMusclePainChange = ({ target }) => setMusclePain(target.checked);
  const handleSoreThroatChange = ({ target }) => setSoreThroat(target.checked);
  const handleSubmit = async (event) => {
    event.preventDefault();

    let payload = {
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
      hin,
    };

    if (!feverOrChills) {
      payload = {
        feverOrChills,
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
        hin,
      };
    }

    // Get response from axios
    const response = await checkInService.checkIn(payload);
    if (response.status === 200) {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <List>
        <ListItem>
          <ListItemText primary="Do you have any of the following signs or symptoms (new or worsening)? Symptoms should not be chromic or related to other known causes or conditions." />
        </ListItem>
        <List>
          <ListItem
            secondaryAction={
              <Checkbox onChange={handleFeverChange} />

            }
          >
            <ListItemText sx={{ paddingLeft: '5%' }} primary="Fever or chills" />
          </ListItem>

          <ListItem
            secondaryAction={
              <TextField type="number" variant="standard" onChange={handleTemperatureChange} disabled={!feverOrChills} />

            }
          >
            <ListItemText sx={{ paddingLeft: '5%' }} primary="Temperature" />
          </ListItem>

          <ListItem
            secondaryAction={
              <Checkbox onChange={handleLossOfSmellAndTasteChange} />
            }
          >
            <ListItemText sx={{ paddingLeft: '5%' }} primary="Sudden loss of sense of smell and taste" />
          </ListItem>
          <ListItem
            secondaryAction={
              <Checkbox onChange={handleDifficultyBreathingChange} />
            }
          >
            <ListItemText sx={{ paddingLeft: '5%' }} primary="Difficulty breathing or shortness of breath" />
          </ListItem>
          <ListItem
            secondaryAction={
              <Checkbox onChange={handleCoughChange} />
            }
          >
            <ListItemText sx={{ paddingLeft: '5%' }} primary="Cough (new or worsening)" />
          </ListItem>
          <ListItem
            secondaryAction={
              <Checkbox onChange={handleRunnyNoseChange} />
            }
          >
            <ListItemText sx={{ paddingLeft: '5%' }} primary="Runny or stuffy nose (of unknown cause)" />
          </ListItem>
        </List>
        <Divider />
        <ListItem
          secondaryAction={
            <Checkbox onChange={handlePast14DaysChange} />
          }
        >
          <ListItemText primary="Have you traveled outside of Canada in the past 14 days?" />
        </ListItem>
        <Divider />
        <ListItem
          secondaryAction={
            <Checkbox onChange={handleCloseContactChange} />
          }
        >
          <ListItemText primary="Have you been in close contact with a confirmed or suspected case of COVID-19?" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Do you have at least two of the following symptoms?" />
        </ListItem>
        <List>
          <ListItem
            secondaryAction={
              <Checkbox onChange={handleSevereFtigueChange} />
            }
          >
            <ListItemText sx={{ paddingLeft: '5%' }} primary="Unusual severe fatigue, for no obvious reason" />
          </ListItem>
          <ListItem
            secondaryAction={
              <Checkbox onChange={handleHeadacheChange} />
            }
          >
            <ListItemText sx={{ paddingLeft: '5%' }} primary="Unusual headache" />
          </ListItem>
          <ListItem
            secondaryAction={
              <Checkbox onChange={handleLossOAappetiteChange} />
            }
          >
            <ListItemText sx={{ paddingLeft: '5%' }} primary="Significant loss of appetite" />
          </ListItem>
          <ListItem
            secondaryAction={
              <Checkbox onChange={handleMusclePainChange} />
            }
          >
            <ListItemText sx={{ paddingLeft: '5%' }} primary="Unusual or unexplained muscle pain or stiffness (not related to physical activity)" />
          </ListItem>
          <ListItem
            secondaryAction={
              <Checkbox onChange={handleSoreThroatChange} />
            }
          >
            <ListItemText sx={{ paddingLeft: '5%' }} primary="Sore throat without obvious cause  " />
          </ListItem>
        </List>
      </List>

      <Button
        variant="contained"
        float="right"
        onClick={handleSubmit}
      >
        SUBMIT
      </Button>
    </>
  );
}

export default DailyCheckIn;
