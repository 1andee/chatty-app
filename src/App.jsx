import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},  // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  };

  // Called after component is rendered and attached to DOM, but not yet visible.
  componentDidMount() {
    console.log("componentDidMount invoked, commencing 3 second delay")
    console.log("Simulating incoming message");
  // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage);
  // Update the state of the app component.}
  // Calling setState will trigger a call to render() in App and all child components.
    setTimeout(() => {
      this.setState( {messages: messages} )
    }, 3000);
  };

  render() {
    console.log("Rendering <App />");
    /* Passing messages array from Lines 11-22 to MessageList component on Line 49
       Passing currentUser from Line 10 to ChatBar component on Line 50 */
    return (
      <div>
        <nav className="navbar">
          <h1 className="navbar navbar-brand">Chatty App</h1>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar name={this.state.currentUser.name} />
      </div>
    );
  };
};
