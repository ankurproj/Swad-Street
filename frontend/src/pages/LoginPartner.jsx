import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/auth.css';

const LoginPartner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/api/auth/foodpartner/login",
      {
        email: e.target.email.value,
        password: e.target.password.value,
      },
      { withCredentials: true }
    );
    if (response?.data?.foodPartner) {
      localStorage.setItem('foodPartner', JSON.stringify(response.data.foodPartner));
      setTimeout(() => navigate('/food-partner/dashboard'), 900);
      }
      

    // Navigate to partner dashboard after "login"
    navigate('/food-partner/dashboard');
  };

  return (
    <>
      {!backgroundLocation && <Header />}
      <div className="auth-container">
        <div className="auth-card">
          {/* Role Switcher */}
          <div className="role-switcher">
            <Link to="/user/login" state={backgroundLocation ? { backgroundLocation } : undefined} className="role-btn" style={{ textDecoration: 'none' }}>
              User
            </Link>
            <button className="role-btn active">Food Partner</button>
          </div>

          <div className="auth-header">
            <div className="auth-logo">Sign In as Partner</div>
            {/* <h2 className="auth-title">Partner Portal</h2>
            <p className="auth-subtitle">Sign in to manage your restaurant and orders</p> */}
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
                <Link to="/food-partner/register" state={backgroundLocation ? { backgroundLocation } : undefined} className="auth-link">Register your restaurant</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {!backgroundLocation && <Footer />}
    </>
  );
};

export default LoginPartner;
