import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

var ws = new WebSocket("ws://0.0.0.0:3001");

export default class App extends Component {

  // Send new chat message to server
  addMessage(newMessage) {
    newMessage.category = "chat";
    newMessage.username = this.state.currentUser;
    ws.send(JSON.stringify(newMessage));
  };

  // Send notification of name change to server
  addUserName(newUserName) {
    let currentName = this.state.currentUser;
    // Checks if new username is identical to current one
    if (newUserName.username === currentName) {
      return;
    } else {
      newUserName.category = "system";
      newUserName.oldName = currentName;
      this.setState( {currentUser: newUserName.username} );
      ws.send(JSON.stringify(newUserName));
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous',
      messages: []
    };
  };

  // Called after component is rendered and attached to DOM, but not yet visible.
  componentDidMount() {

    ws.onopen = (ws) => {
      console.log('Successfully connected to the Chatty Server back end');
    };

    // Receive all broadcasts and update state accordingly
    ws.onmessage = (broadcast) => {
      let broadcastMessage = JSON.parse(broadcast.data);

      switch(broadcastMessage.category) {
        case 'connection':
          let { count } = broadcastMessage;
          this.setState( {users: count} );
        case 'system':
          let { username, oldName } = broadcastMessage;
          broadcastMessage.notification = (`**${oldName}** changed username to **${username}**`);
          this.setState( {messages: this.state.messages.concat(broadcastMessage)} );
          break;
        case 'chat':
          this.setState( {messages: this.state.messages.concat(broadcastMessage)} );
          break;
      };
    };

  };

  render() {
    return (
      <div>
        <nav className='navbar'>
          <h1 className='navbar navbar-brand'>Chatty App</h1>
          <span className='navbar-users'>Users online: {this.state.users}</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          onNewMessage={this.addMessage.bind(this)}
          onNewUserName={this.addUserName.bind(this)}
          />
      </div>
    );
  };

};
