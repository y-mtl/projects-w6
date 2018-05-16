import React, {Component} from 'react';

function MessageItem(props) {
  return (
    <div>
      <div className="message" key="props.message.id">
        <span className="message-username">{props.message.username}</span>
        <span className="message-content">{props.message.content}</span>
      </div>
      {/*<div className="message system">Anonymous1 changed their name to nomnom.
      </div>*/}
    </div>
  );
}
export default MessageItem;


// class Message extends Component {
//   render() {
//     return (
//       <div className="message">
//         <span className="message-username">Anonymous1</span>
//         <span className="message-content">I won't be impressed with technology until I can download food.</span>
//       </div>
//       <div className="message system">
//         Anonymous1 changed their name to nomnom.
//       </div>
//     );
//   }
// }