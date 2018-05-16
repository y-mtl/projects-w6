import React, {Component} from 'react';
import MessageItem from './Message.jsx';

class MessageList extends Component {
  render(){
    const messages = this.props.messages.map(message => {
      return <MessageItem message={message} />
    });
    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}

export default MessageList;


// function MessageList(messages) {
//   render(){

//   }
//   return (
//     <main className="messages">
//       <MessageItem />
//     </main>
//   );
// }

