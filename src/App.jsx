import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// WebSocket WebSocket(
//   in DOMString "ws://localhost:3001",
//   in optional DOMString protocols
// );

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
    this.getMsg = this.getMsg.bind(this);
    //this.socket = this.socket.bind(this);console.log(this.socket);
  }

  socketInit(){
    const connection = new WebSocket("ws://localhost:3001");
    return connection;
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = this.socketInit();

    this.socket.onopen = event => {
      console.log('Connected to server');
    }

    let receivedMsg = {};
    //console.log(1, this);
    this.socket.onmessage = function(event) {
      let msg = [];
      if(this.state.messages){
        const receivedMsg = JSON.parse(event.data);
        const messages = this.state.messages.concat(receivedMsg);

        this.setState({
          messages: messages
        })
      }
    }.bind(this)
    // the above this (from this.socket) and this.setState(in the onmessage block)
    // is not the same. need to use 'bind(this)' to be the same 'this'.
  }

  getMsg(msg){
    //const msgId = this.state.messages.length + 1;
    //const messages = this.state.messages.concat(msg);
    this.socket.send(JSON.stringify(msg));
    // this.setState = {
    //   currentUser: {name: "Bob"},
    //   messages: [
    //     {
    //       username:,
    //       content:,
    //       id:
    //     }]
    // };
    //console.log("msg", msg);
    // const messages = this.state.connection.onmessage = (event) => {
    //   var receivedMsg = JSON.parse(event.data);
    //   console.log(receivedMsg);
    // }
    // const messages = this.state.messages.concat(msg);
    // this.setState({
    //   currentUser: {name: msg.username},
    //   messages: this.state.messages,
    //   id: this.state.messages.id
    // })
    //console.log('After this state:', this.state.messages);
  }
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} getMsg={this.getMsg} />
      </div>
    );
  }
}

export default App;