import React, {Component} from 'react';

const $ = (className) => document.querySelector(className);

export default class ChatBar extends React.Component{
  render() {
    console.log('Rendering <ChatBar />');
    return (
      <footer className='chatbar'>
        <input className='chatbar-username' placeholder='Your Name (Optional)' defaultValue={this.props.name} />
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' />
      </footer>
    );
  };

  componentDidMount() {

    // Event Listener for when ENTER/RETURN key is pressed in chatbar
    $('.chatbar-message').addEventListener('keypress', (e) => {
      const username = $('.chatbar-username').value;

      // Ensures message can't be blank
      if (e.keyCode === 13 && e.target.value !== '') {

        // Sets properties for new message
        this.props.onNewMessage({
          username: (username.length === 0) ? 'Anonymous': username,
          content: e.target.value
        });
      };
    });
  };
};
