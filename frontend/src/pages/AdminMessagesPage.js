import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages/all', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load messages');
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSendResponse = async (userId) => {
    if (!response) return;

    try {
      const responseMessage = await axios.post('/api/messages/to-user', { userId, text: response }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (responseMessage.status === 201) {
        setMessages(messages.map(msg =>
          msg.sender._id === userId ? { ...msg, response: response } : msg
        ));
        setResponse('');
      }
    } catch (error) {
      setError('Failed to send response');
    }
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="admin-messages-page">
      <h2>Admin Messages</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="message-list">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.fromAdmin ? 'admin' : 'user'}`}>
              <p>{msg.text}</p>
              {msg.fromAdmin && (
                <textarea
                  value={response}
                  onChange={handleResponseChange}
                  placeholder="Write your response..."
                />
              )}
              {msg.fromAdmin && (
                <button onClick={() => handleSendResponse(msg.sender._id)}>Send Response</button>
              )}
            </div>
          ))
        ) : (
          <p>No messages available</p>
        )}
      </div>
    </div>
  );
};

export default AdminMessagesPage;
