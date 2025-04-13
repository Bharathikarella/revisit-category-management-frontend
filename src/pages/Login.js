import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';
import API from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-form">
    <form  onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
    <p className="auth-footer">
    Don’t have an account?
    <Link to="/signup" className="auth-link"> Sign up</Link>
  </p>
  </div>
  );
};

export default Login;
