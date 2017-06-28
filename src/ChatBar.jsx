import React, {Component} from 'react';

export default class ChatBar extends React.Component{
  render() {
    console.log("Rendering <ChatBar />");
    return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.name} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
    );
  };
};
