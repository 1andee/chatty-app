import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {

    // Iterate through each chat message from parent component(s)
    let messages = this.props.messages.map((message) => {
      let { id, category, notification, username, content } = message;

      if (category === "system") {
        return <Message
                key={id}
                notification={notification}
                />
            } else {
      return <Message
              key={id}
              username={username}
              content={content}
              />
          }
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
