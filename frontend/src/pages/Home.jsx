import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const Home = () => {
  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">Zomato</Link>
          <div className="nav-links">
            <Link to="/user/login" className="nav-btn nav-btn-outline">Sign In</Link>
            <Link to="/user/register" className="nav-btn nav-btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
          <span>🎉</span>
          <span>Now delivering to 100+ cities</span>
        </div>
        
        <h1 className="hero-title">
          Discover the best food & drinks in <span className="gradient-text">your city</span>
        </h1>
        
        <p className="hero-subtitle">
          Order from your favorite restaurants and get it delivered to your doorstep. 
          Fast, reliable, and delicious every time.
        </p>

        <div className="hero-cta">
          <Link to="/user/register" className="cta-btn cta-btn-primary">
            <span>Order Now</span>
            <span>→</span>
          </Link>
          <Link to="/food-partner/register" className="cta-btn cta-btn-secondary">
            <span>Partner With Us</span>
            <span>🤝</span>
          </Link>
        </div>

        <div className="hero-image">
          🍕🍔🍜🍱🌮
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Why Choose Zomato?</h2>
            <p className="features-subtitle">Experience the best food delivery service</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Fast Delivery</h3>
              <p className="feature-description">
                Get your food delivered in under 30 minutes. We value your time and hunger!
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3 className="feature-title">Wide Selection</h3>
              <p className="feature-description">
                Choose from thousands of restaurants and cuisines. Something for everyone!
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Best Prices</h3>
              <p className="feature-description">
                Enjoy great deals and offers. Save money while eating your favorite food!
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3 className="feature-title">Quality Assured</h3>
              <p className="feature-description">
                Only the best restaurants. We maintain high quality standards for you.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Easy to Use</h3>
              <p className="feature-description">
                Simple and intuitive interface. Order in just a few clicks!
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure Payments</h3>
              <p className="feature-description">
                Multiple payment options with 100% secure transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">How It Works</h2>
            <p className="features-subtitle">Get your food in 3 simple steps</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Choose Your Food</h3>
              <p className="step-description">
                Browse through hundreds of restaurants and select your favorite dishes
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Place Your Order</h3>
              <p className="step-description">
                Add items to cart, customize your order, and checkout securely
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Enjoy Your Meal</h3>
              <p className="step-description">
                Track your order in real-time and enjoy hot, fresh food at your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Restaurants */}
      <section className="features" style={{ background: 'var(--bg-primary)' }}>
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">For Restaurant Partners</h2>
            <p className="features-subtitle">Grow your business with Zomato</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Increase Revenue</h3>
              <p className="feature-description">
                Reach millions of customers and boost your sales significantly
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Marketing Support</h3>
              <p className="feature-description">
                Get featured on our platform with promotional campaigns
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Business Analytics</h3>
              <p className="feature-description">
                Track orders, revenue, and customer insights with our dashboard
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3 className="feature-title">Dedicated Support</h3>
              <p className="feature-description">
                Get 24/7 support from our restaurant success team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-text">
            Join thousands of happy customers and restaurants on Zomato today!
          </p>
          <div className="cta-buttons">
            <Link to="/user/register" className="cta-btn-white">
              Order Food Now →
            </Link>
            <Link to="/food-partner/register" className="cta-btn-white">
              Register Your Restaurant →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Company</h3>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>For Customers</h3>
              <ul className="footer-links">
                <li><Link to="/user/login">Sign In</Link></li>
                <li><Link to="/user/register">Create Account</Link></li>
                <li><Link to="/help">Help & Support</Link></li>
                <li><Link to="/offers">Offers</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>For Partners</h3>
              <ul className="footer-links">
                <li><Link to="/food-partner/register">Partner With Us</Link></li>
                <li><Link to="/food-partner/login">Partner Login</Link></li>
                <li><Link to="/partner-support">Partner Support</Link></li>
                <li><Link to="/guidelines">Guidelines</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Legal</h3>
              <ul className="footer-links">
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/cookies">Cookie Policy</Link></li>
                <li><Link to="/security">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 Zomato Clone. All rights reserved. Made with ❤️ for food lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
