import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
  console.log("Rendering <MessageList/>");
    return (
    <div id="message">
      <Message />
    </div>
    );
  };
};