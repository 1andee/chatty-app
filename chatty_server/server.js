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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  var seconds = Date.now();
  var timestamp = new Date(seconds);
  console.log(`Client connected to Chatty Server at ${timestamp}`);

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
        console.log("The broadcast was sent to all connected clients");
      };
    });
  };

  ws.on('message', function incoming(message) {
    var newMessage = JSON.parse(message);
    let { username, content } = newMessage;
    newMessage.id = uuidv4();
    console.log(`User ${username} said ${content} (ref: ${newMessage.id})`);
    wss.broadcast(newMessage);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected from Chatty Server'));
});
