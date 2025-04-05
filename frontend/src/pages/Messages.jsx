import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get('/api/messages');
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  const handleMessageChange = (e) => {
    setMessageContent(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/messages', { content: messageContent });
      setMessages([...messages, data.message]);
      setMessageContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <div>
        {messages.map(message => (
          <div key={message._id}>
            <p><strong>{message.sender.name}:</strong> {message.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <textarea
          value={messageContent}
          onChange={handleMessageChange}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Messages;
