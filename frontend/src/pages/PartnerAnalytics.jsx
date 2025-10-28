import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';

export default function PartnerAnalytics(){
  const navigate = useNavigate();
  const handleLogout = async () => {
    try { await axios.post('http://localhost:3000/api/auth/foodpartner/logout', {}, { withCredentials: true }); } catch {}
    localStorage.removeItem('foodPartner');
    navigate('/food-partner/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <Link to="/" className="logo">Swad Street Partner</Link>
          <nav className="header-nav">
            <Link to="/food-partner/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/food-partner/orders" className="nav-link">Orders</Link>
            <Link to="/food-partner/menu" className="nav-link">Menu</Link>
            <Link to="/food-partner/analytics" className="nav-link active">Analytics</Link>
          </nav>
          <div className="user-menu">
            <div className="user-avatar" title="Partner">PP</div>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="section-header">
          <h1 className="section-title">Analytics</h1>
          <p className="section-subtitle">Monitor performance, orders, and revenue</p>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3 className="empty-title">No data yet</h3>
          <p className="empty-text">Once you start receiving orders, analytics will appear here.</p>
        </div>
      </main>
    </div>
  );
}
