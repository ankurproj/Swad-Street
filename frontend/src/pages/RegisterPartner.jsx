import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/auth.css';

const RegisterPartner = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform registration logic here (e.g., API call)
    const restaurantName = e.target.restaurantName.value;
    const ownerName = e.target.ownerName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const password = e.target.password.value;
    console.log({ restaurantName, ownerName, email, phone, password });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/register",
        {
          name: restaurantName,
          ownerName,
          email,
          phone,
          address,
          password,
        },
        { withCredentials: true }
      );
      if (response?.data?.foodPartner) {
        localStorage.setItem('foodPartner', JSON.stringify(response.data.foodPartner));
      }
      setStatus({ type: 'success', message: 'Partner account created successfully.' });
      setTimeout(() => navigate('/food-partner/dashboard'), 900);
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
            <Link to="/user/register" className="role-btn" style={{ textDecoration: 'none' }}>
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
            {status.message && (
              <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                {status.message}
              </div>
            )}
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
              <label className="form-label" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="form-input"
                placeholder="Enter restaurant address"
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
                <Link to="/food-partner/login" className="auth-link">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPartner;
