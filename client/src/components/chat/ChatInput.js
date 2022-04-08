import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import '../../public/styles/Chat.css';
import chatService from '../../services/chat';

/* eslint-disable no-console */
function ChatInput({ chatTargetId, dummyListener, setDummyListener }) {
  const [message, setMessage] = useState('');
  const handleMessageChange = ({ target }) => setMessage(target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = { content: message };
      const token = localStorage.getItem('token');
      const response = await chatService.sendMessage(token, chatTargetId, payload);
      if (response.status === 200) {
        setDummyListener(!dummyListener);
        document.getElementById('input-text').value = '';
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <form className="wrapForm" noValidate autoComplete="off">
      <TextField
        id="input-text"
        label="Enter your message here"
        className="wrapText"
        onChange={handleMessageChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        <SendIcon />
      </Button>
    </form>
  );
}

export default ChatInput;
