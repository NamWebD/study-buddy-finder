import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

function Register({ setUser }) {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', location: '', subjects: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const subjectsArray = formData.subjects.split(',').map(s => s.trim());
      const res = await axios.post(`${config.API_URL}/api/auth/register`, {
        ...formData,
        subjects: subjectsArray
      });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Location (e.g., Mumbai, India)"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Subjects (comma separated, e.g., Math, Physics)"
          value={formData.subjects}
          onChange={(e) => setFormData({...formData, subjects: e.target.value})}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '3rem' },
  form: { background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '400px' },
  input: { width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem' },
  button: { width: '100%', padding: '0.8rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1rem', cursor: 'pointer' },
  error: { color: '#e74c3c', marginBottom: '1rem' }
};

export default Register;