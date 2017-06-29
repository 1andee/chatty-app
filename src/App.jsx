import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

var ws = new WebSocket("ws://0.0.0.0:3001");

export default class App extends Component {

  addMessage(newMessage) {
    ws.send(JSON.stringify(newMessage));
  }

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ''},
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };
  };

  // Called after component is rendered and attached to DOM, but not yet visible.
  componentDidMount() {

    ws.onopen = (ws) => {
      console.log('Successfully connected to the Chatty Server back end');
    };

    // Receive all chat broadcasts, add to this.state.messages, and update state
    ws.onmessage = (broadcast) => {
      let broadcastMessage = JSON.parse(broadcast.data);
      let messages = this.state.messages.concat(broadcastMessage);
      this.setState( {messages: messages} );
    };
  };

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <nav className='navbar'>
          <h1 className='navbar navbar-brand'>Chatty App</h1>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          name={this.state.currentUser.name}
          onNewMessage={this.addMessage.bind(this)}
          />
      </div>
    );
  };

};
