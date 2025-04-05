import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(data);
    };

    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const { data } = await axios.post('/api/contacts', newContact, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setContacts([...contacts, data.contact]);
    setNewContact({ name: '', phone: '', email: '' });
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Add New Contact</h3>
      <form onSubmit={handleAddContact}>
        <input type="text" name="name" placeholder="Name" value={newContact.name} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={newContact.phone} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={newContact.email} onChange={handleChange} />
        <button type="submit">Add Contact</button>
      </form>

      <h3>Your Contacts</h3>
      <ul>
        {contacts.map((c) => (
          <li key={c._id}>{c.name} - {c.phone} - {c.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
