import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignInPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Sign-In Data:', formData);
    alert('Sign-in form submitted');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link>
      </p>
    </div>
  );
}

export default SignInPage;
