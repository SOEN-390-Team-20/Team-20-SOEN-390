import React from 'react';
import {
  Box,
  Typography,
  Modal,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const symptomTest1 = 'Cough';
const symptomTest2 = 'Headache';
const date = 'March 20, 2022';

function SymptomModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      { /* Need to Loop ListItem & Modal for each symptom data from the GET request */ }
      <ListItem disablePadding>
        <ListItemButton onClick={handleOpen}>
          <ListItemText sx={{ textAlign: 'center' }} primary="March 20, 2022" />
        </ListItemButton>
      </ListItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {date}
            &nbsp;- Symptoms Submitted
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {symptomTest1}
            <br />
            {symptomTest2}
            <br />
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default SymptomModal;
