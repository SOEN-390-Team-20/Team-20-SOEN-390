import React from 'react';
import '../../public/styles/Chat.css';

function MessageReceived(props) {
  const { message, timestamp, displayName } = props;
  return (
    <div className="messageRow">
      <div>
        <div className="displayName">{displayName || 'unknown'}</div>
        <div className="messageBlue">
          <div>
            <p className="messageContent">{message || 'no message'}</p>
          </div>
          <div className="messageTimeStampRight">{timestamp || ''}</div>
        </div>
      </div>
    </div>
  );
}

function MessageSent(props) {
  const { message, timestamp } = props;
  return (
    <div className="messageRowRight">
      <div className="messageOrange">
        <p className="messageContent">{message || 'no message'}</p>
        <div className="messageTimeStampRight">{timestamp || ''}</div>
      </div>
    </div>
  );
}

export { MessageReceived, MessageSent };
