import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
    <div>
      <nav className="navbar">
        <h1 className="navbar navbar-brand">Chatty</h1>
      </nav>
      <MessageList />
      <ChatBar />
    </div>
    );
  };
};
