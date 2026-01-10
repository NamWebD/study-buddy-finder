import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ user }) {
  const [buddies, setBuddies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: '', description: '', location: user.location, availability: ''
  });
  const [filter, setFilter] = useState({ subject: '', location: '' });

  useEffect(() => {
    fetchBuddies();
  }, []);

  const fetchBuddies = async () => {
    try {
      const res = await axios.get('/api/buddies', { params: filter });
      setBuddies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/buddies', { ...formData, userId: user.id });
      setFormData({ subject: '', description: '', location: user.location, availability: '' });
      setShowForm(false);
      fetchBuddies();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/buddies/${id}`);
      fetchBuddies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Study Buddy Dashboard</h1>
      
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Filter by subject"
          value={filter.subject}
          onChange={(e) => setFilter({...filter, subject: e.target.value})}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Filter by location"
          value={filter.location}
          onChange={(e) => setFilter({...filter, location: e.target.value})}
          style={styles.input}
        />
        <button onClick={fetchBuddies} style={styles.filterBtn}>Search</button>
      </div>

      <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
        {showForm ? 'Cancel' : '+ Create Study Buddy Post'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Description (e.g., Looking for someone to study calculus with)"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            style={styles.textarea}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Availability (e.g., Weekends)"
            value={formData.availability}
            onChange={(e) => setFormData({...formData, availability: e.target.value})}
            style={styles.input}
          />
          <button type="submit" style={styles.submitBtn}>Post</button>
        </form>
      )}

      <div style={styles.buddyList}>
        {buddies.map(buddy => (
          <div key={buddy._id} style={styles.card}>
            <h3>{buddy.subject}</h3>
            <p>{buddy.description}</p>
            <p><strong>📍 Location:</strong> {buddy.location}</p>
            <p><strong>⏰ Availability:</strong> {buddy.availability}</p>
            <p><strong>👤 Posted by:</strong> {buddy.userId.name}</p>
            <p><strong>📧 Contact:</strong> {buddy.userId.email}</p>
            {buddy.userId._id === user.id && (
              <button onClick={() => handleDelete(buddy._id)} style={styles.deleteBtn}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
  filters: { display: 'flex', gap: '1rem', marginBottom: '2rem' },
  input: { padding: '0.8rem', border: '1px solid #ddd', borderRadius: '5px', flex: 1 },
  filterBtn: { padding: '0.8rem 2rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  addBtn: { padding: '1rem 2rem', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '2rem' },
  form: { background: '#ecf0f1', padding: '1.5rem', borderRadius: '10px', marginBottom: '2rem' },
  textarea: { width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '5px', minHeight: '100px' },
  submitBtn: { padding: '0.8rem 2rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  buddyList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
  card: { background: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  deleteBtn: { marginTop: '1rem', padding: '0.5rem 1rem', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};

export default Dashboard;