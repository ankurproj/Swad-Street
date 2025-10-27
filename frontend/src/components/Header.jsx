import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ minimal = false }) => {
  const [theme, setTheme] = useState('system');
  const navigate = useNavigate();
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  }, []);

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

  const initials = useMemo(() => {
    const name = user?.fullName || user?.name || '';
    if (!name) return 'GU';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const last = parts[1]?.[0] || '';
    return (first + last || first).toUpperCase();
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/user/logout', {}, { withCredentials: true });
    } catch {}
    localStorage.removeItem('user');
    navigate('/user/login');
  };

  return (
    <header className="auth-header-nav">
      <div className="auth-header-container">
        <Link to="/" className="auth-logo-link">
          <span className="auth-logo-text">Swad Street</span>
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
            {user ? (
              <div className="header-user-menu">
                <Link to="/user/dashboard" className="header-user-avatar" title={user.fullName || user.email}>{initials}</Link>
                <button className="header-logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="header-auth-links">
                <Link to="/user/register" className="header-primary">Get Started</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
