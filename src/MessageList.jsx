import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    console.log('Rendering <MessageList />');

    // Iterate through each chat message from parent component(s)
    let messages = this.props.messages.map((message) => {
      return <Message
              key={message.id}
              username={message.username}
              content={message.content}
              />
    });

    // Format output from above array map method
    return (
      <div id='message'>
        <Message />
        {messages}
      </div>
    );
  };
};
