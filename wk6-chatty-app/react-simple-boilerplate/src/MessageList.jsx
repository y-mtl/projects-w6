import React, {Component} from 'react';
import MessageItem from './Message.jsx';

class MessageList extends Component {
  render(){
    const currentUser = this.props.currentUser;
    const messages = this.props.messages.map(message => {
      return <MessageItem message={message} currentUser={currentUser} />
    });
    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}
export default MessageList;