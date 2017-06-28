import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
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
    setTimeout(() => {
      this.setState( /* PLACE HOLDER */ )
    }, 3000);
  };

  render() {
    console.log("Rendering <App />");
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
