import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // دریافت پیام‌ها از سرور
    const fetchMessages = async () => {
      const response = await axios.get('/api/messages/my', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessages(response.data);
    };

    fetchMessages();
  }, []);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!newMessage) return;

    const response = await axios.post('/api/messages/to-admin', { text: newMessage }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    if (response.status === 201) {
      setMessages([...messages, { text: newMessage, fromAdmin: false }]);
      setNewMessage('');
    }
  };

  return (
    <div className="message-page">
      <h2>Messages</h2>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.fromAdmin ? 'admin' : 'user'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={handleMessageChange}
        placeholder="Write your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessagePage;
