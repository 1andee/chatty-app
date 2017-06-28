import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    console.log('Rendering <MessageList />');

    // Iterates through each chat message from parent component(s) Message.jsx and App.jsx
    let messages = this.props.messages.map((message) => {
      return <Message key={message.id} username={message.username} content={message.content} />
    });

    // Formats the output from above array map method
    return (
      <div id='message'>
        <Message />
        {messages}
      </div>
    );
  };
};
