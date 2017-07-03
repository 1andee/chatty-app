import React, {Component} from 'react';

const $ = (className) => document.querySelector(className);

export default class ChatBar extends React.Component{
  render() {
    return (
      <footer className='chatbar'>
        <input className='chatbar-username' placeholder='Your Name (Optional)'  />
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' />
      </footer>
    );
  };

  componentDidMount() {

    // Event Listener for chatbar-message
    $('.chatbar-message').addEventListener('keypress', (e) => {
      const username = $('.chatbar-username').value;

      // Ensures message can't be blank
      if (e.keyCode === 13 && e.target.value !== '') {

        // Sets properties for new message
        this.props.onNewMessage({
          username: (username.length === 0) ? 'Anonymous': username,
          content: e.target.value
        });
        e.target.value = '';
      };
    });

    // Event Listener for chatbar-username
    $('.chatbar-username').addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        const username = e.target.value;
        this.props.onNewUserName({
          username: (username.length === 0) ? 'Anonymous': username
        });
      };
    });

  };
};
