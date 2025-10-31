import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
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
  // Sample data - in production this would come from API
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: '$12.99', status: 'Available', emoji: '🍕' },
    { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: '$14.99', status: 'Available', emoji: '🍕' },
    { id: 3, name: 'Caesar Salad', category: 'Salads', price: '$8.99', status: 'Available', emoji: '🥗' },
    { id: 4, name: 'Garlic Bread', category: 'Sides', price: '$4.99', status: 'Out of Stock', emoji: '🥖' },
  ];

  const todayOrders = [
    { id: 1, customer: 'John Doe', items: '2 items', total: '$28.50', status: 'Preparing', time: '10 min ago' },
    { id: 2, customer: 'Jane Smith', items: '1 item', total: '$12.99', status: 'Ready', time: '15 min ago' },
    { id: 3, customer: 'Mike Johnson', items: '3 items', total: '$42.00', status: 'Delivered', time: '25 min ago' },
    { id: 4, customer: 'Sarah Williams', items: '2 items', total: '$24.99', status: 'Preparing', time: '5 min ago' },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button
              className="hamburger-btn"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
            >
              <span className="hamburger-icon"><span /></span>
            </button>
            <Link to="/" className="logo">Swad Street</Link>
          </div>
          <nav className="header-nav">
            <Link to="/food-partner/orders" className="nav-link">Orders</Link>
            <Link to="/food-partner/menu" className="nav-link">Menu</Link>
            <Link to="/food-partner/analytics" className="nav-link">Analytics</Link>
          </nav>
          <div className="user-menu">
            <div
              className="user-avatar"
              title={`${displayName}${ownerName && restaurantName && ownerName !== restaurantName ? ' • ' + (ownerName === displayName ? restaurantName : ownerName) : ''}`}
              onClick={() => navigate('/food-partner/dashboard')}
            >
              {initials}
            </div>
            <span className="role-badge" title="Logged in as Partner">Partner</span>
            <button onClick={handleLogout} className="btn-logout" aria-label="Logout" title="Logout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">Menu</span>
          <button className="mobile-drawer-close" aria-label="Close" onClick={() => setMobileOpen(false)}>✕</button>
        </div>
        <nav className="mobile-drawer-nav">
          <Link to="/food-partner/dashboard" className="mobile-drawer-link" onClick={() => setMobileOpen(false)}>📊 Dashboard</Link>
          <Link to="/food-partner/orders" className="mobile-drawer-link" onClick={() => setMobileOpen(false)}>🧾 Orders</Link>
          <Link to="/food-partner/menu" className="mobile-drawer-link" onClick={() => setMobileOpen(false)}>🍽️ Menu</Link>
          <Link to="/food-partner/analytics" className="mobile-drawer-link" onClick={() => setMobileOpen(false)}>📈 Analytics</Link>
          <div className="mobile-drawer-sep" />
          <button className="mobile-drawer-btn mobile-logout" onClick={() => { setMobileOpen(false); handleLogout(); }}>🚪 Logout</button>
        </nav>
        <div className="mobile-drawer-footer" />
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <div className="section-header">
          <h1 className="section-title">Welcome back, {displayName}! 🍕</h1>
          <p className="section-subtitle">Here's what's happening with your restaurant today</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon primary">📦</div>
            </div>
            <div className="stat-value">48</div>
            <div className="stat-label">Orders Today</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon success">💰</div>
            </div>
            <div className="stat-value">$1,248</div>
            <div className="stat-label">Today's Revenue</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon warning">⏱️</div>
            </div>
            <div className="stat-value">28 min</div>
            <div className="stat-label">Avg Prep Time</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon info">⭐</div>
            </div>
            <div className="stat-value">4.5</div>
            <div className="stat-label">Customer Rating</div>
          </div>
        </div>

        {/* Today's Orders */}
        <div className="section-header" style={{ marginTop: 'var(--spacing-3xl)' }}>
          <h2 className="section-title" style={{ fontSize: 'var(--font-size-2xl)' }}>Today's Orders</h2>
          <p className="section-subtitle">Manage your incoming orders</p>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {todayOrders.map((order) => (
                <tr key={order.id}>
                  <td><strong>#{order.id.toString().padStart(4, '0')}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.items}</td>
                  <td><strong>{order.total}</strong></td>
                  <td>
                    <span className={`badge ${
                      order.status === 'Delivered' ? 'success' : 
                      order.status === 'Ready' ? 'warning' : 'primary'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Menu Items */}
        <div className="section-header" style={{ marginTop: 'var(--spacing-3xl)' }}>
          <h2 className="section-title" style={{ fontSize: 'var(--font-size-2xl)' }}>Your Menu</h2>
          <p className="section-subtitle">Manage your menu items</p>
        </div>

        <div className="card-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="card">
              <div className="card-image">
                <span style={{ fontSize: '4rem' }}>{item.emoji}</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-subtitle">{item.category}</p>
                <div className="card-meta">
                  <span><strong>{item.price}</strong></span>
                  <span className={`badge ${item.status === 'Available' ? 'success' : 'warning'}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="section-header" style={{ marginTop: 'var(--spacing-3xl)' }}>
          <h2 className="section-title" style={{ fontSize: 'var(--font-size-2xl)' }}>Quick Actions</h2>
        </div>

        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <button className="stat-card" style={{ cursor: 'pointer', border: 'none', background: 'var(--bg-primary)' }}>
            <div className="stat-icon primary" style={{ margin: '0 auto var(--spacing-md)' }}>➕</div>
            <div className="stat-label">Add Menu Item</div>
          </button>
          <button className="stat-card" style={{ cursor: 'pointer', border: 'none', background: 'var(--bg-primary)' }}>
            <div className="stat-icon success" style={{ margin: '0 auto var(--spacing-md)' }}>📊</div>
            <div className="stat-label">View Analytics</div>
          </button>
          <button className="stat-card" style={{ cursor: 'pointer', border: 'none', background: 'var(--bg-primary)' }}>
            <div className="stat-icon warning" style={{ margin: '0 auto var(--spacing-md)' }}>⚙️</div>
            <div className="stat-label">Restaurant Settings</div>
          </button>
          <button className="stat-card" style={{ cursor: 'pointer', border: 'none', background: 'var(--bg-primary)' }}>
            <div className="stat-icon info" style={{ margin: '0 auto var(--spacing-md)' }}>💬</div>
            <div className="stat-label">Customer Reviews</div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default PartnerDashboard;
