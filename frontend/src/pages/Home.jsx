import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/landing.css';

// Icon components
const IconRestaurant = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2M17 8v14" />
  </svg>
);

const IconReel = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none" />
  </svg>
);

const IconBookmark = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 4h10a1 1 0 0 1 1 1v14l-6-3-6 3V5a1 1 0 0 1 1-1z" />
  </svg>
);

const IconRecipe = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="6" />
    <path d="M8 14v7M16 14v7M12 14v7" />
    <path d="M5 14h14" />
  </svg>
);

const IconDelivery = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="1" y="3" width="15" height="13" />
    <path d="M16 8h5l3 3v5h-2M16 16h-4" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const IconPrice = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6v12M15 9H9.5a1.5 1.5 0 0 0 0 3h5a1.5 1.5 0 0 1 0 3H9" />
  </svg>
);

const IconQuality = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconMobile = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="6" y="2" width="12" height="20" rx="2" />
    <path d="M12 18h.01" />
  </svg>
);

const IconSecure = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconMenu = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="4" rx="1" />
    <rect x="3" y="10" width="18" height="4" rx="1" />
    <rect x="3" y="16" width="18" height="4" rx="1" />
  </svg>
);

const IconVideo = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 7l-7 5 7 5V7z" fill="currentColor" stroke="currentColor" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    <circle cx="5.5" cy="9.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="10" cy="9.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconAnalytics = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <path d="M7 16V8M12 16V6M17 16v-4" />
  </svg>
);

const IconOrders = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const IconPromotion = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconSupport = (props) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const Home = () => {
  const location = useLocation();
  const bg = { backgroundLocation: location };
  // Typewriter phrases for home hero (same behavior as dashboard)
  const heroPhrases = useMemo(() => ([
    'Get Dishes from favorite restaurants',
    "Explore dishes & cuisines you'll love",
    'Discover top picks around your city',
  ]), []);

  const [typerIndex, setTyperIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const current = heroPhrases[typerIndex % heroPhrases.length] || '';
    let timeout = isDeleting ? 45 : 95;
    let nextText = displayText;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        nextText = current.slice(0, displayText.length + 1);
      } else {
        timeout = 1200;
        setIsDeleting(true);
      }
    } else {
      if (displayText.length > 0) {
        nextText = current.slice(0, displayText.length - 1);
      } else {
        setIsDeleting(false);
        setTyperIndex((i) => (i + 1) % heroPhrases.length);
        timeout = 350;
      }
    }

    const id = setTimeout(() => {
      if (nextText !== displayText) setDisplayText(nextText);
      setTick((t) => t + 1);
    }, timeout);
    return () => clearTimeout(id);
  }, [tick, displayText, isDeleting, typerIndex, heroPhrases]);
  return (
    <div className="landing">
      <Header minimal={false} />

      {/* Hero Section */}
      <section
        className="hero hero-with-bg"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=80")',
        }}
      >
        <div className="hero-badge">
          <span>🎉</span>
          <span>Now delivering to 100+ cities</span>
        </div>

        <h1 className="hero-title">
          Discover the best food & drinks in <span className="gradient-text">your city</span>
        </h1>

        <p className="hero-subtitle hero-typer" aria-live="polite">
          <span className="typewriter-text">{displayText}</span>
          <span className="typewriter-caret">|</span>
        </p>

        <div className="hero-cta">
          <Link to="/user/register" state={bg} className="cta-btn cta-btn-primary">
            <span>Order Now</span>
            <span>→</span>
          </Link>
          <Link to="/food-partner/register" state={bg} className="cta-btn cta-btn-secondary">
            <span>Partner With Us</span>
            <span>🤝</span>
          </Link>
        </div>

        {/* Background image handled via CSS on .hero-with-bg */}
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Why Choose Swad Street?</h2>
            <p className="features-subtitle">Experience the best food delivery service</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><IconRestaurant /></div>
              <h3 className="feature-title">Find Restaurants</h3>
              <p className="feature-description">
                Find your favorite restaurant in one click!
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconRecipe /></div>
              <h3 className="feature-title">Dish & Cuisine Recipie</h3>
              <p className="feature-description">
                Browse your favourite dishes and cuisines recipies here!
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconReel /></div>
              <h3 className="feature-title">Recipies Reels</h3>
              <p className="feature-description">
                Watch your favourite dish making reels here!
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconDelivery /></div>
              <h3 className="feature-title">Fast Delivery</h3>
              <p className="feature-description">
                Get your food delivered in under 30 minutes. We value your time and hunger!
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconBookmark /></div>
              <h3 className="feature-title">Save Reels</h3>
              <p className="feature-description">
                Save favorite recipies reels for future!
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconPrice /></div>
              <h3 className="feature-title">Best Prices</h3>
              <p className="feature-description">
                Enjoy great deals and offers. Save money while eating your favorite food!
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconQuality /></div>
              <h3 className="feature-title">Quality Assured</h3>
              <p className="feature-description">
                Only the best restaurants. We maintain high quality standards for you.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconMobile /></div>
              <h3 className="feature-title">Easy to Use</h3>
              <p className="feature-description">
                Simple and intuitive interface. Order in just a few clicks!
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconSecure /></div>
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
            <h2 className="features-title">How Swad Street Works</h2>
            <p className="features-subtitle">Discover, explore, and order in four simple steps</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon"><IconRestaurant /></div>
              <h3 className="step-title">Find Restaurants Near You</h3>
              <p className="step-description">
                Use our live location feature to discover restaurants within 7km. Browse by cuisine, rating, or distance.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon"><IconRecipe /></div>
              <h3 className="step-title">Explore Dishes & Recipes</h3>
              <p className="step-description">
                Browse 5,000+ dishes across cuisines. View detailed recipes, ingredients, and watch quick recipe reels for inspiration.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon"><IconDelivery /></div>
              <h3 className="step-title">Order & Track Delivery</h3>
              <p className="step-description">
                Add to cart, choose secure payment, and track your order in real-time. Average delivery in 28 minutes.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-icon"><IconBookmark /></div>
              <h3 className="step-title">Save & Reorder Favorites</h3>
              <p className="step-description">
                Bookmark recipes, save reels, and use 1-click reorder for your favorite meals anytime.
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
            <p className="features-subtitle">Complete digital toolkit to manage and grow your restaurant</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><IconMenu /></div>
              <h3 className="feature-title">Menu & Inventory Management</h3>
              <p className="feature-description">
                Add, update, and manage your menu items with real-time inventory tracking. Set availability and pricing instantly.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconRecipe /></div>
              <h3 className="feature-title">Create & Share Recipes</h3>
              <p className="feature-description">
                Publish detailed recipes for your signature dishes. Build trust and attract food enthusiasts to your restaurant.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconVideo /></div>
              <h3 className="feature-title">Upload Recipe Reels</h3>
              <p className="feature-description">
                Create engaging video reels of your cooking process. Showcase your culinary skills and reach 10x more customers.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconOrders /></div>
              <h3 className="feature-title">Order Management</h3>
              <p className="feature-description">
                Accept, track, and manage orders in real-time. Automated notifications and seamless delivery coordination.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconAnalytics /></div>
              <h3 className="feature-title">Business Analytics Dashboard</h3>
              <p className="feature-description">
                Track sales, revenue trends, popular dishes, peak hours, and customer insights with comprehensive analytics.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconPromotion /></div>
              <h3 className="feature-title">Promotions & Offers</h3>
              <p className="feature-description">
                Create custom deals, discounts, and combo offers. Get featured in promotional campaigns to boost visibility.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconSupport /></div>
              <h3 className="feature-title">24/7 Partner Support</h3>
              <p className="feature-description">
                Dedicated restaurant success team available round-the-clock. Get help with onboarding, technical issues, and growth strategies.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><IconSecure /></div>
              <h3 className="feature-title">Secure Payments & Payouts</h3>
              <p className="feature-description">
                Fast and secure payment processing. Weekly payouts with complete transaction transparency and reports.
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
            Join thousands of happy customers and restaurants on Swad Street today!
          </p>
          <div className="cta-buttons">
            <Link to="/user/register" state={bg} className="cta-btn-white">
              Order Food Now →
            </Link>
            <Link to="/food-partner/register" state={bg} className="cta-btn-white">
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
                <li><Link to="/user/login" state={bg}>Sign In</Link></li>
                <li><Link to="/user/register" state={bg}>Create Account</Link></li>
                <li><Link to="/help">Help & Support</Link></li>
                <li><Link to="/offers">Offers</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>For Partners</h3>
              <ul className="footer-links">
                <li><Link to="/food-partner/register" state={bg}>Partner With Us</Link></li>
                <li><Link to="/food-partner/login" state={bg}>Partner Login</Link></li>
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
            <p>© 2025 Swad Street. All rights reserved. Made with ❤️ for food lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
