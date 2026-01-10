import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Find Your Perfect Study Buddy 🎓</h1>
      <p style={styles.subtitle}>Connect with students learning the same subjects in your area</p>
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3>📍 Location-Based</h3>
          <p>Find study partners near you</p>
        </div>
        <div style={styles.feature}>
          <h3>📚 Subject Matching</h3>
          <p>Connect over shared subjects</p>
        </div>
        <div style={styles.feature}>
          <h3>⚡ Easy to Use</h3>
          <p>Create profile in minutes</p>
        </div>
      </div>
      <Link to="/register">
        <button style={styles.cta}>Get Started Free</button>
      </Link>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' },
  title: { fontSize: '3rem', color: '#2c3e50', marginBottom: '1rem' },
  subtitle: { fontSize: '1.3rem', color: '#7f8c8d', marginBottom: '3rem' },
  features: { display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' },
  feature: { background: '#ecf0f1', padding: '2rem', borderRadius: '10px', width: '250px' },
  cta: { background: '#3498db', color: 'white', border: 'none', padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '5px', cursor: 'pointer' }
};

export default Home;