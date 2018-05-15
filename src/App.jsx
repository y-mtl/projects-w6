import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

//console.log(MessageItem);
class App extends Component {
  render() {
    return (
      //<h1>Hello React :)</h1>
      {MessageList},
      {ChatBar}
    );
  }
}
export default App;
