import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Typography from '@mui/material/Typography';
import '../../public/styles/Chat.css';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import chatService from '../../services/chat';
import { MessageReceived, MessageSent } from './MessageItem';

/* eslint-disable no-console */
function ChatContainerModal({ handleChatClose, open }) {
  const [currentId, setCurrentId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [targetFirstName, setTargetFirstName] = useState('');
  const [messages, setMessages] = useState([]);

  React.useEffect(async () => {
    await chatService.getMessages().then((response) => {
      setCurrentId(response.data.currentId);
      setTargetId(response.data.targetId);
      setTargetFirstName(response.data.targetFirstName);
      setMessages(response.data.messages);
    }).catch((error) => {
      console.error(`Error${error}`);
    });
  }, []);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleChatClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>

          <div className="container">
            <Paper className="paper" zDepth={2}>
              <Paper id="style-1" className="messages-body">
                {messages.map((message) => {
                  if (message.sender === currentId) {
                    return (
                      <MessageSent
                        message={message.content}
                        timestamp={message.timestamp}
                      />
                    );
                  } if (message.sender === targetId) {
                    return (
                      <MessageReceived
                        message={message.content}
                        timestamp={message.timestamp}
                        displayName={targetFirstName}
                      />
                    );
                  }
                  return (<div />);
                })}
              </Paper>
              {/* <TextInput /> */}
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ChatContainerModal;
