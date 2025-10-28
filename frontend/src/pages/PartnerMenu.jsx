import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';

export default function PartnerMenu(){
  const navigate = useNavigate();
  const handleLogout = async () => {
    try { await axios.post('http://localhost:3000/api/auth/foodpartner/logout', {}, { withCredentials: true }); } catch {}
    localStorage.removeItem('foodPartner');
    navigate('/food-partner/login');
  };

  const foodPartner = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('foodPartner') || 'null'); } catch { return null; }
  }, []);
  const ownerName = useMemo(() => foodPartner?.ownerName || '', [foodPartner]);
  const restaurantName = useMemo(() => foodPartner?.name || '', [foodPartner]);
  const displayName = useMemo(() => ownerName || restaurantName || 'Partner', [ownerName, restaurantName]);
  const initials = useMemo(() => {
    const parts = displayName.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const last = parts[1]?.[0] || '';
    return (first + last || first || 'P').toUpperCase();
  }, [displayName]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <Link to="/" className="logo">Swad Street Partner</Link>
          <nav className="header-nav">
            <Link to="/food-partner/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/food-partner/orders" className="nav-link">Orders</Link>
            <Link to="/food-partner/menu" className="nav-link active">Menu</Link>
            <Link to="/food-partner/analytics" className="nav-link">Analytics</Link>
          </nav>
          <div className="user-menu">
            <div className="user-avatar" title={`${displayName}${ownerName && restaurantName && ownerName !== restaurantName ? ' • ' + (ownerName === displayName ? restaurantName : ownerName) : ''}`}>{initials}</div>
            <span className="role-badge" title="Logged in as Partner">Partner</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="section-header">
          <h1 className="section-title">Menu</h1>
          <p className="section-subtitle">Manage your dishes and categories</p>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3 className="empty-title">No menu items yet</h3>
          <p className="empty-text">Add your first dish to start receiving orders.</p>
        </div>
      </main>
    </div>
  );
}
