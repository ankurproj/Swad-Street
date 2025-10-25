import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ minimal = false }) => {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    if (newTheme === 'light') {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else if (newTheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      // System theme - remove attribute to use CSS prefers-color-scheme
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'system');
    }
  };

  const toggleTheme = () => {
    let newTheme;
    if (theme === 'system') {
      newTheme = 'light';
    } else if (theme === 'light') {
      newTheme = 'dark';
    } else {
      newTheme = 'system';
    }
    
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const getThemeIcon = () => {
    if (theme === 'light') return '☀️';
    if (theme === 'dark') return '🌙';
    return '💻';
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Light';
    if (theme === 'dark') return 'Dark';
    return 'System';
  };

  return (
    <header className="auth-header-nav">
      <div className="auth-header-container">
        <Link to="/" className="auth-logo-link">
          <span className="auth-logo-text">Zomato</span>
        </Link>
        
        {!minimal && (
          <div className="auth-header-actions">
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn"
              title={`Current: ${getThemeLabel()} - Click to cycle`}
            >
              <span className="theme-icon">{getThemeIcon()}</span>
              <span className="theme-label">{getThemeLabel()}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
