import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/auth.css';
import axios from 'axios';
const RegisterUser = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/user/register", {
        fullName,
        email,
        phone,
        password
      },{
        withCredentials: true
      });
      if (response?.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      setStatus({ type: 'success', message: 'Account created successfully.' });
      setTimeout(() => navigate('/user/dashboard'), 900);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed. Please check the details and try again.';
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
            <button className="role-btn active">User</button>
            <Link to="/food-partner/register" className="role-btn" style={{ textDecoration: 'none' }}>
              Food Partner
            </Link>
          </div>

          <div className="auth-header">
            <div className="auth-logo">Swad Street</div>
            <h2 className="auth-title">Join Swad Street</h2>
            <p className="auth-subtitle">Create your account and start exploring amazing food</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {status.message && (
              <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                {status.message}
              </div>
            )}
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>

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
              <label className="form-label" htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="form-input"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Create a strong password"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
            </div>

            <div className="divider">or</div>

            <div className="auth-footer">
              <p className="text-muted">
                Already have an account?{' '}
                <Link to="/user/login" className="auth-link">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterUser;
