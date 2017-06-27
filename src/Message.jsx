import React, {Component} from 'react';

export default class Message extends Component {
  render() {
    console.log("Rendering <Message />");
    return (
    <div className="message">
      <span className="message-username">Anonymous</span>
      <span className="message-content">I won't be impressed with technology until I can download food.</span>
    </div>
    );
  };
};