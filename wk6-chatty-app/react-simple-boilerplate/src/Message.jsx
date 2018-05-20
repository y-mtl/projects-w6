import React, {Component} from 'react';

function MessageItem(props) {
  let output='';
  if(props.message.type !== 'incomingNotification') {
    output =
    (<div className="message" key="props.message.id">
      <span className={`message-username ${ props.message.colour }`}>{props.message.username}</span>
      <span className="message-content">{props.message.content}</span>
    </div>);
  } else {
    output =
    (<div className="message system">
      <span className="notification-content">{props.message.content}.</span>
    </div>);
  }

  return (
    <div>
      {output}
    </div>
  );
}
export default MessageItem;