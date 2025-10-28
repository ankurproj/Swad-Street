import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/auth.css';

const LoginPartner = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/login",
        { email, password },
        { withCredentials: true }
      );
      if (response?.data?.foodPartner) {
        localStorage.setItem('foodPartner', JSON.stringify(response.data.foodPartner));
        // Clear any stale user session to avoid role conflicts in header/pages
        localStorage.removeItem('user');
      }
      setStatus({ type: 'success', message: 'Logged in successfully.' });
      setTimeout(() => navigate('/food-partner/dashboard'), 900);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed. Please check your credentials.';
      setStatus({ type: 'error', message: msg });
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="auth-card">
          {/* Role Switcher */}
          <div className="role-switcher">
            <Link to="/user/login" className="role-btn" style={{ textDecoration: 'none' }}>
              User
            </Link>
            <button className="role-btn active">Food Partner</button>
          </div>

          <div className="auth-header">
            <div className="auth-logo">Swad Street Partner</div>
            <h2 className="auth-title">Partner Portal</h2>
            <p className="auth-subtitle">Sign in to manage your restaurant and orders</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {status.message && (
              <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                {status.message}
              </div>
            )}
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your business email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="text-muted text-center">
              <span className="auth-link">Forgot password?</span>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>

            <div className="divider">or</div>

            <div className="auth-footer">
              <p className="text-muted">
                Not registered yet?{' '}
                <Link to="/food-partner/register" className="auth-link">Register your restaurant</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPartner;
