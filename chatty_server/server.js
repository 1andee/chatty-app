const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
.use(express.static('public'))
.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Chatty Server listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Callback that runs when a client connects to the server
wss.on('connection', (ws) => {
  let seconds = Date.now();
  let timestamp = new Date(seconds);
  console.log(`Client connected to Chatty Server at ${timestamp}`);

  // Function to broadcast incoming chat messages
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
        console.log("The broadcast was sent to all connected clients");
      };
    });
  };

  // Receive incoming chat messages and call the broadcast function
  ws.on('message', function incoming(message) {
    let newMessage = JSON.parse(message);
    switch(newMessage.category) {
      case 'chat':
        console.log("This is a chat message")
        break;
      case 'system':
          console.log("This is a system message");
        break;
    }
    newMessage.id = uuidv4();
    let { username, content, id } = newMessage;
    console.log(`User ${username} said ${content} (ref: ${id})`);
    wss.broadcast(newMessage);
  });

  // Callback for when client closes the socket
  ws.on('close', () => console.log('Client disconnected from Chatty Server'));
});
