import React, {Component} from 'react';

class ChatBar extends Component {
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const newMsg = {
        username: (document.getElementById('user').value) ? document.getElementById('user').value : 'Anonymous',
        content: document.getElementById('comment').value
      };
      this.props.getMsg(newMsg);
      document.getElementById('comment').value = '';
    }
  }
  render(){
    return (
      <footer className="chatbar">
        <input id="user" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
        <input id="comment" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;


// function ChatBar(props) {
//   return (
//     <footer className="chatbar">
//       <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.currentUser.name} />
//       <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._handleKeyPress} />
//     </footer>
//   );
// }