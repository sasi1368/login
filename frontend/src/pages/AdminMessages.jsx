import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState('');

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

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSendResponse = async (messageId, e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/messages/respond/${messageId}`, { response });
      setResponse('');
      // Optionally, update the message list or mark as responded
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  return (
    <div>
      <h2>Admin Messages</h2>
      <div>
        {messages.map(message => (
          <div key={message._id}>
            <p><strong>{message.sender.name}:</strong> {message.content}</p>
            <form onSubmit={(e) => handleSendResponse(message._id, e)}>
              <textarea
                value={response}
                onChange={handleResponseChange}
                placeholder="Type your response"
              />
              <button type="submit">Send Response</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
