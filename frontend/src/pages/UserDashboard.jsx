import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  }, []);

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
  // Sample data - in production this would come from API
  const restaurants = [
    { id: 1, name: 'Pizza Paradise', cuisine: 'Italian', rating: 4.5, delivery: '30-40 min', emoji: '🍕' },
    { id: 2, name: 'Burger Bros', cuisine: 'American', rating: 4.3, delivery: '25-35 min', emoji: '🍔' },
    { id: 3, name: 'Sushi Station', cuisine: 'Japanese', rating: 4.7, delivery: '40-50 min', emoji: '🍱' },
    { id: 4, name: 'Curry House', cuisine: 'Indian', rating: 4.6, delivery: '35-45 min', emoji: '🍛' },
    { id: 5, name: 'Taco Fiesta', cuisine: 'Mexican', rating: 4.4, delivery: '20-30 min', emoji: '🌮' },
    { id: 6, name: 'Pasta Palace', cuisine: 'Italian', rating: 4.5, delivery: '30-40 min', emoji: '🍝' },
  ];

  const recentOrders = [
    { id: 1, restaurant: 'Pizza Paradise', items: 'Margherita Pizza, Garlic Bread', total: '$24.99', status: 'Delivered', date: 'Oct 18, 2025' },
    { id: 2, restaurant: 'Burger Bros', items: 'Double Cheese Burger, Fries', total: '$18.50', status: 'Delivered', date: 'Oct 15, 2025' },
    { id: 3, restaurant: 'Sushi Station', items: 'California Roll, Miso Soup', total: '$32.00', status: 'Cancelled', date: 'Oct 12, 2025' },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <Link to="/" className="logo">Swad Street</Link>
          <nav className="header-nav">
            <Link to="/user/dashboard" className="nav-link active">Home</Link>
            <Link to="/user/orders" className="nav-link">My Orders</Link>
            <Link to="/user/favorites" className="nav-link">Favorites</Link>
          </nav>
          <div className="user-menu">
            <div className="user-avatar" title={user?.fullName || user?.email || 'Guest'}>{initials}</div>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <div className="section-header">
          <h1 className="section-title">What would you like to eat?</h1>
          <p className="section-subtitle">Order from your favorite restaurants near you</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search for restaurants, cuisines, or dishes..."
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon primary">🍽️</div>
            </div>
            <div className="stat-value">150+</div>
            <div className="stat-label">Restaurants Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon success">✅</div>
            </div>
            <div className="stat-value">24</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon warning">⭐</div>
            </div>
            <div className="stat-value">12</div>
            <div className="stat-label">Favorite Places</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon info">💰</div>
            </div>
            <div className="stat-value">$150</div>
            <div className="stat-label">Savings This Month</div>
          </div>
        </div>

        {/* Popular Restaurants */}
        <div className="section-header">
          <h2 className="section-title" style={{ fontSize: 'var(--font-size-2xl)' }}>Popular Restaurants</h2>
          <p className="section-subtitle">Top-rated places in your area</p>
        </div>

        <div className="card-grid">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="card">
              <div className="card-image">
                <span style={{ fontSize: '4rem' }}>{restaurant.emoji}</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">{restaurant.name}</h3>
                <p className="card-subtitle">{restaurant.cuisine}</p>
                <div className="card-meta">
                  <span>⭐ {restaurant.rating}</span>
                  <span>🕒 {restaurant.delivery}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="section-header" style={{ marginTop: 'var(--spacing-3xl)' }}>
          <h2 className="section-title" style={{ fontSize: 'var(--font-size-2xl)' }}>Recent Orders</h2>
          <p className="section-subtitle">Your order history</p>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.restaurant}</td>
                  <td>{order.items}</td>
                  <td><strong>{order.total}</strong></td>
                  <td>
                    <span className={`badge ${order.status === 'Delivered' ? 'success' : 'warning'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
