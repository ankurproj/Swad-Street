import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/auth.css';

const LoginPartner = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to partner dashboard after "login"
    navigate('/food-partner/dashboard');
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
            <div className="auth-logo">Zomato Partner</div>
            <h2 className="auth-title">Partner Portal</h2>
            <p className="auth-subtitle">Sign in to manage your restaurant and orders</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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
