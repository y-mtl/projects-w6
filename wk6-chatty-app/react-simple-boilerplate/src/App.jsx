import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: {},
      messages: []
    };
    this.addMsg = this.addMsg.bind(this);
    this.addUserName = this.addUserName.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket = this.socketInit();

    this.socket.onopen = event => {
      console.log('Connected to server');
    }
    this.socket.onmessage = (event) => {
      //console.log(event.data);
      const receivedMsg = JSON.parse(event.data);

      // message to show online users in header
      if(receivedMsg.type === 'onlineUsers'){
        this.onlineUsers = this.getOnlineUsers(receivedMsg.onlineUsers);
        this.setState({getOnlineUsers: this.onlineUsers});
      }

      if (this.state.messages && receivedMsg.type !== 'onlineUsers'){
        let messages = {};console.log(receivedMsg);
        switch(receivedMsg.type) {
          case 'incomingMessage':
            break;
          case 'incomingNotification':
            if (this.state.currentUser !== receivedMsg.username) {
              receivedMsg.content = (!this.state.currentUser.name ? 'Anonymous' : this.state.currentUser.name) + ' has changed username to ' + receivedMsg.username;
            }
            break;
          default:
            throw new Error('Unknown event type ' + receivedMsg.type);
        }

        // add new msg
        messages = this.state.messages.concat(receivedMsg);

        // set currentUser if it's been changed
        // this is the case when the user changed username AND add contents
        const newUser = messages[messages.length - 1].username;

        if(this.state.currentUser !== newUser){
          this.setState({
            currentUser: {name: newUser},
            colour: this.state.colour,
            messages: messages
          })
        } else {
          this.setState({
            currentUser: {name: messages.username},
            colour: this.state.colour,
            messages: messages
          })
        }
      }
    }//.bind(this)  ===> if use ES5 in this.socket.onmessage = function(event){}
    // the above this (from this.socket) and this.setState(in the onmessage block)
    // is not the same. need to use 'bind(this)' to be the same 'this'.
  }

  socketInit(){
    const connection = new WebSocket("ws://localhost:3001");
    return connection;
  }

  getOnlineUsers(users){
    const navMsg = users + ((users === '1') ? ' user' : ' users') + ' online';
    this.onlineUsers = navMsg;
    return navMsg;
  }

  addMsg(msg){
    this.socket.send(JSON.stringify(msg));
  }
  addUserName(userInfo){
    this.socket.send(JSON.stringify(userInfo));
  }

  render() {
    return (
      <div>
        <nav class="navbar">
          <a href="/" class="navbar-brand">Chatty</a>
          <span class="online-users">{this.onlineUsers}</span>
        </nav>
        <MessageList currentUser={this.state.currentUser} messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} colour={this.state.messages.colour} addMsg={this.addMsg} addUserName={this.addUserName} />
      </div>
    );
  }
}
export default App;