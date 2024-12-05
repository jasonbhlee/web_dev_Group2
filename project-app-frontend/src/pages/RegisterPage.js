import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data to send to the backend
    const userData = {
      userFirstName: formData.name,  // Frontend 'name' maps to 'userFirstName'
      email: formData.email,
      password: formData.password,
    };
  
    try {
      // Send data to the backend
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }
  
      // If registration is successful, redirect to the sign-in page
      alert('Registration successful!');
      history.push('/'); // Redirect to sign-in page
  
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed: ' + error.message);
    }
  };
  

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Sign In</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
