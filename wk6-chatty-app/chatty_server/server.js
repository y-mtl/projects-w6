const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const ws = new WebSocket('ws://localhost:3001');
const PORT = 3001;

const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// add unique ID when a user connected.
wss.getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

// ran# to allocate different colours to each user
// (4 colours for css class, colour codes are in scss file.)
let cssPalettes = ['colour1', 'colour2', 'colour3', 'colour4'];
wss.getColourID = function () {
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
  ws.id = wss.getUniqueID();
  ws.colorid = wss.getColourID();

  let clientsNum = 0;
  wss.clients.forEach(function each(client) {
    clientsNum++;
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
    // add css colour class
    message.colour = ws.colorid;
    msgToSend = JSON.stringify(message);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msgToSend);
      }
    });
  });

  // Set up a callback for when a client closes the socket.
  ws.on('close', () => {
    console.log('Client disconnected');
    delete(ws.id);
    clientsNum--;
    wss.clients.forEach(function each(client) {
      wss.broadcast(clientsNum);
    });
  });

});

