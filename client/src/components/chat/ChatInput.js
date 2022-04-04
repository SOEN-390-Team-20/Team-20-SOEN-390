import React from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import '../../public/styles/Chat.css';

function TextInput() {
  return (
    <form className="wrapForm" noValidate autoComplete="off">
      <TextField
        id="input-text"
        label="Enter your message here"
        className="wrapText"
      />
      <Button variant="contained" color="primary">
        <SendIcon />
      </Button>
    </form>
  );
}

export default TextInput;
