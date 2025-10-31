import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/auth.css';

const LoginUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response =  await axios.post("http://localhost:3000/api/auth/user/login", {
        email,
        password
      },{
        withCredentials: true
      });
      // Save user for UI personalization
      if (response?.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      setStatus({ type: 'success', message: 'Logged in successfully.' });
      setTimeout(() => navigate('/user/dashboard'), 900);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed. Please check your credentials.';
      setStatus({ type: 'error', message: msg });
    }
  };

  return (
    <>
      {!backgroundLocation && <Header />}
      <div className="auth-container">
        <div className="auth-card">
          {/* Role Switcher */}
          <div className="role-switcher">
            <button className="role-btn active">User</button>
            <Link to="/food-partner/login" state={backgroundLocation ? { backgroundLocation } : undefined} className="role-btn" style={{ textDecoration: 'none' }}>
              Food Partner
            </Link>
          </div>

          <div className="auth-header">
            <div className="auth-logo">Swad Street</div>
            <h2 className="auth-title">Welcome Back!</h2>
            <p className="auth-subtitle">Sign in to discover great food and restaurants near you</p>
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
                placeholder="Enter your email"
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
                Don't have an account?{' '}
                <Link to="/user/register" state={backgroundLocation ? { backgroundLocation } : undefined} className="auth-link">Create account</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {!backgroundLocation && <Footer />}
    </>
  );
};

export default LoginUser;
