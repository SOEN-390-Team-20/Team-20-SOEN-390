import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Typography from '@mui/material/Typography';
import '../../public/styles/Chat.css';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { MessageReceived, MessageSent } from './MessageItem';
import chatService from '../../services/chat';

/* eslint-disable no-console */
function ChatContainerModal({ handleChatClose, open }) {
  const [messages, setMessages] = useState([]);
  React.useEffect(async () => {
    await chatService.getMessages().then((response) => {
      setMessages(response);
    }).catch((error) => {
      console.error(`Error${error}`);
    }, []);
  });

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
                <MessageReceived
                  message="hey i hope you got my messsage"
                  timestamp="MM/DD 00:00"
                  displayName="Oliver"
                />
                <MessageSent
                  message="ya i did thanks"
                  timestamp="MM/DD 00:00"
                  displayName="Jonathan"
                />
                <MessageReceived
                  message="hey i hope you got my messsage"
                  timestamp="MM/DD 00:00"
                  displayName="Oliver"
                />
                <MessageSent
                  message="ya i did thanks"
                  timestamp="MM/DD 00:00"
                  displayName="Jonathan"
                />
                <MessageReceived
                  message="hey i hope you got my messsage"
                  timestamp="MM/DD 00:00"
                  displayName="Oliver"
                />
                <MessageSent
                  message="ya i did thanks"
                  timestamp="MM/DD 00:00"
                  displayName="Jonathan"
                />
                <MessageReceived
                  message="hey i hope you got my messsage"
                  timestamp="MM/DD 00:00"
                  displayName="Oliver"
                />
                <MessageSent
                  message="LAST MESSAGE"
                  timestamp="MM/DD 00:00"
                  displayName="Jonathan"
                />
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
