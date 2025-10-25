import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/auth.css';

const LoginUser = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to user dashboard after "login"
    navigate('/user/dashboard');
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="auth-card">
          {/* Role Switcher */}
          <div className="role-switcher">
            <button className="role-btn active">User</button>
            <Link to="/food-partner/login" className="role-btn" style={{ textDecoration: 'none' }}>
              Food Partner
            </Link>
          </div>

          <div className="auth-header">
            <div className="auth-logo">Zomato</div>
            <h2 className="auth-title">Welcome Back!</h2>
            <p className="auth-subtitle">Sign in to discover great food and restaurants near you</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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
                <Link to="/user/register" className="auth-link">Create account</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginUser;
