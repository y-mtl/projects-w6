const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

const ws = new WebSocket('ws://localhost:3001');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

// ran# to allocate different colours to each user (4 colours)
wss.getColourID = function () {
  let cssPalettes = ['colour1', 'colour2', 'colour3', 'colour4'];
  cssPalettes.sort(function(){
    return Math.random()-0.5;
  });
  return cssPalettes[0];
}

wss.broadcast = function broadcast(users) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      const onlineUsers = {
        type: 'onlineUsers',
        onlineUsers: users
      }
      const onlineNotification = JSON.stringify(onlineUsers);
      client.send(onlineNotification);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.id = wss.getUniqueID(); //console.log(ws.id);
  ws.colorid = wss.getColourID();// console.log('color: ', ws.colorid);
  //console.log(ws.id);
  let clientsNum = 0;
  wss.clients.forEach(function each(client) {
    clientsNum++;
    // console.log('Client.ID: ' + client.id);
    wss.broadcast(clientsNum);
  });

  // Broadcast to all clients.
  ws.on('message', function incoming(message) {
    message = JSON.parse(message);
    switch(message.type) {
      case 'postMessage':
        message.type = 'incomingMessage';
        break;
      case "postNotification":
        message.type = 'incomingNotification';
        break;
      default:
        console.log("Event type issue " + message.type);
    }
    message['id'] = uuidv1();
    // css color
    message.colour = ws.colorid;
    msgToSend = JSON.stringify(message);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msgToSend);
      }
    });
  });

  // Set up a callback for when a client closes the socket.
  // This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    delete(ws.id);
    clientsNum--;
    wss.clients.forEach(function each(client) {
      // console.log('Client.ID: ' + client.id);
      wss.broadcast(clientsNum);
    });
  });

});

