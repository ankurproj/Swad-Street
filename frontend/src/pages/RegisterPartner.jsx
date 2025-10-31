import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/auth.css';

const RegisterPartner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Perform registration logic here (e.g., API call)
    const restaurantName = e.target.restaurantName.value;
    const ownerName = e.target.ownerName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    console.log({ restaurantName, ownerName, email, phone, password });

    try {
      const response = await axios.post("http://localhost:3000/api/auth/foodpartner/register", {
        restaurantName,
        ownerName,
        email,
        phone,
        password
      });
      console.log('Registration successful:', response.data);
      // Navigate to partner dashboard after "registration"
      navigate('/food-partner/dashboard');
    } catch (error) {
      console.error('Error registering partner:', error);
    }
  };

  return (
    <>
      {!backgroundLocation && <Header />}
      <div className="auth-container">
        <div className="auth-card">
          {/* Role Switcher */}
          <div className="role-switcher">
            <Link to="/user/register" state={backgroundLocation ? { backgroundLocation } : undefined} className="role-btn" style={{ textDecoration: 'none' }}>
              User
            </Link>
            <button className="role-btn active">Food Partner</button>
          </div>

          <div className="auth-header">
            <div className="auth-logo">Swad Street Partner</div>
            <h2 className="auth-title">Partner With Us</h2>
            <p className="auth-subtitle">Register your restaurant and reach millions of customers</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="restaurantName">Restaurant Name</label>
              <input
                type="text"
                id="restaurantName"
                className="form-input"
                placeholder="Enter restaurant name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="ownerName">Owner Name</label>
              <input
                type="text"
                id="ownerName"
                className="form-input"
                placeholder="Enter owner name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter business email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="form-input"
                placeholder="Enter contact number"
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
                Register Restaurant
              </button>
            </div>

            <div className="divider">or</div>

            <div className="auth-footer">
              <p className="text-muted">
                Already a partner?{' '}
                <Link to="/food-partner/login" state={backgroundLocation ? { backgroundLocation } : undefined} className="auth-link">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {!backgroundLocation && <Footer />}
    </>
  );
};

export default RegisterPartner;
