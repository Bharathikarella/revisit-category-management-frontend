import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import API from '../services/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/auth/signup', { email, password });
      navigate('/');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Create Account</button>
    </form>
  );
};

export default Signup;
