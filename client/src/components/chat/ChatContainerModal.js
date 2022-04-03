import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Typography from '@mui/material/Typography';
import '../../public/styles/Chat.css';
import Paper from '@mui/material/Paper';
// import { TextInput } from './TextInput.js';
// import { MessageLeft, MessageRight } from './Message';

function ChatContainerModal({ handleChatClose, open }) {
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
              <Paper id="style-1" className="messages-body" />
              {/* <TextInput /> */}
            </Paper>
          </div>

        </Fade>
      </Modal>
    </div>
  );
}

export default ChatContainerModal;
