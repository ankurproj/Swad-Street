import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="auth-footer-section">
      <div className="auth-footer-container">
        <div className="footer-content-grid">
          <div className="footer-column">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-list">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">For Customers</h4>
            <ul className="footer-list">
              <li><Link to="/user/login">Sign In</Link></li>
              <li><Link to="/user/register">Create Account</Link></li>
              <li><Link to="/help">Help & Support</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">For Partners</h4>
            <ul className="footer-list">
              <li><Link to="/food-partner/register">Partner With Us</Link></li>
              <li><Link to="/food-partner/login">Partner Login</Link></li>
              <li><Link to="/partner-support">Support</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-list">
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/security">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-section">
          <p>© 2025 Swad Street. All rights reserved. Made with ❤️ for food lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
