import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';
import ReelsModal from '../components/ReelsModal';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [showReels, setShowReels] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Hero typewriter phrases and state
  const heroPhrases = useMemo(() => ([
    'Order from your favorite restaurants near you',
    "Explore dishes & cuisines you'll love",
    'Discover top picks around your city',
  ]), []);
  const [typerIndex, setTyperIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [tick, setTick] = useState(0);
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
  const popularRef = useRef(null);
  const ordersRef = useRef(null);
  // Removed legacy sample restaurants section to focus on live APIs

  const recentOrders = [
    { id: 1, restaurant: 'Pizza Paradise', items: 'Margherita Pizza, Garlic Bread', total: '$24.99', status: 'Delivered', date: 'Oct 18, 2025' },
    { id: 2, restaurant: 'Burger Bros', items: 'Double Cheese Burger, Fries', total: '$18.50', status: 'Delivered', date: 'Oct 15, 2025' },
    { id: 3, restaurant: 'Sushi Station', items: 'California Roll, Miso Soup', total: '$32.00', status: 'Cancelled', date: 'Oct 12, 2025' },
  ];

  // =============================
  // TheMealDB (Dishes & Cuisines)
  // =============================
  const [mealAreas, setMealAreas] = useState([]); // cuisines/areas
  const [mealQuery, setMealQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [mealResults, setMealResults] = useState([]);
  const [mealLoading, setMealLoading] = useState(false);
  const [mealError, setMealError] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealVisible, setMealVisible] = useState(9);

  const loadMealAreas = async () => {
    try {
      setMealError('');
      const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      setMealAreas(data?.meals || []);
    } catch (e) {
      setMealError('Failed to load cuisines.');
    }
  };
  useEffect(() => { loadMealAreas(); }, []);
  
  // Typewriter effect for hero subtitle
  useEffect(() => {
    const current = heroPhrases[typerIndex % heroPhrases.length] || '';
    let timeout = isDeleting ? 45 : 95;
    let nextText = displayText;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        nextText = current.slice(0, displayText.length + 1);
      } else {
        // pause at full text
        timeout = 1200;
        setIsDeleting(true);
      }
    } else {
      if (displayText.length > 0) {
        nextText = current.slice(0, displayText.length - 1);
      } else {
        // move to next phrase
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

  const searchMeals = async () => {
    if (!mealQuery.trim()) return;
    setMealLoading(true); setMealError(''); setSelectedMeal(null);
    try {
      const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(mealQuery.trim())}`);
      setMealResults(data?.meals || []);
      setMealVisible(9);
    } catch (e) {
      setMealError('Search failed.');
    } finally { setMealLoading(false); }
  };

  const loadMealsByArea = async () => {
    if (!selectedArea) return;
    setMealLoading(true); setMealError(''); setSelectedMeal(null);
    try {
      const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(selectedArea)}`);
      setMealResults(data?.meals || []);
      setMealVisible(9);
    } catch (e) {
      setMealError('Failed to load meals for the selected cuisine.');
    } finally { setMealLoading(false); }
  };

  const viewMealDetails = async (idMeal) => {
    setMealLoading(true); setMealError('');
    try {
      const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      setSelectedMeal(data?.meals?.[0] || null);
    } catch (e) {
      setMealError('Failed to load meal details.');
    } finally { setMealLoading(false); }
  };

  // =============================
  // Overpass (Nearby Restaurants)
  // =============================
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [nearbyError, setNearbyError] = useState('');
  const [nearby, setNearby] = useState([]);
  const [coords, setCoords] = useState({ lat: '', lng: '' });
  const [addressQuery, setAddressQuery] = useState('');
  const [nearbyVisible, setNearbyVisible] = useState(9);

  // Overpass endpoints with retry for mobile/CORS robustness
  const OVERPASS_ENDPOINTS = useMemo(() => ([
    'https://overpass-api.de/api/interpreter',
    'https://z.overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.nchc.org.tw/api/interpreter',
    'https://overpass.openstreetmap.fr/api/interpreter',
    'https://overpass.openstreetmap.ru/cgi/interpreter',
  ]), []);

  const overpassRequest = async (query) => {
    // Prefer GET first to avoid POST preflight issues on mobile; then fall back to POST
    for (const ep of OVERPASS_ENDPOINTS) {
      try {
        const { data } = await axios.get(ep, {
          params: { data: query },
          headers: { 'Accept': 'application/json' },
          timeout: 20000,
        });
        return data;
      } catch {}
      try {
        const { data } = await axios.post(ep, query, {
          headers: { 'Content-Type': 'text/plain', 'Accept': 'application/json' },
          timeout: 20000,
        });
        return data;
      } catch {}
    }
    throw new Error('All Overpass endpoints failed');
  };

  const fetchNearby = async (lat, lng) => {
    setNearbyLoading(true); setNearbyError(''); setNearby([]);
    const query = `
      [out:json][timeout:25];
      node["amenity"="restaurant"](around:7000,${lat},${lng});
      out body;
    `;
    try {
      const data = await overpassRequest(query);
      const elements = data?.elements || [];
      setNearby(elements);
      setNearbyVisible(9);
    } catch (e) {
      setNearbyError('Failed to load nearby restaurants. Please try again. (Tip: enable location or search by city).');
    } finally { setNearbyLoading(false); }
  };
  
  const distanceKm = (lat1, lon1, lat2, lon2) => {
    if ([lat1, lon1, lat2, lon2].some(v => v === '' || v === null || v === undefined)) return null;
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const fetchIPLocation = async () => {
    // Fallback approximate location via IP (rate-limited; suitable for dev/demo)
    const resp = await fetch('https://ipapi.co/json');
    const data = await resp.json();
    if (data && data.latitude && data.longitude) {
      return { lat: Number(data.latitude), lng: Number(data.longitude) };
    }
    throw new Error('IP-based location unavailable');
  };

  const useMyLocation = async () => {
    setNearbyError('');
    // Prefer browser geolocation when available and allowed
    try {
      if (!('geolocation' in navigator)) {
        throw new Error('Geolocation not supported on this browser.');
      }

      const perm = navigator.permissions && navigator.permissions.query ? await navigator.permissions.query({ name: 'geolocation' }) : null;
      const tryGeo = () => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });

      let position;
      if (!perm || perm.state === 'granted' || perm.state === 'prompt') {
        try {
          position = await tryGeo();
        } catch (err) {
          // If denied or timed out, fallback to IP-based location
          position = await fetchIPLocation();
        }
      } else {
        // denied -> fallback to IP-based approx
        position = await fetchIPLocation();
      }

      setCoords({ lat: position.lat.toFixed(6), lng: position.lng.toFixed(6) });
      await fetchNearby(position.lat, position.lng);
    } catch (e) {
      setNearbyError(e?.message || 'Unable to determine location. You can try again later.');
    }
  };

  const geocodeAndSearch = async () => {
    if (!addressQuery.trim()) return;
    setNearbyError('');
    setNearbyLoading(true);
    try {
      const q = addressQuery.trim();
      // Try Nominatim main
      const nominatimUrls = [
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`,
        `https://nominatim.openstreetmap.fr/search?format=json&limit=1&q=${encodeURIComponent(q)}`,
      ];
      let results = [];
      for (const url of nominatimUrls) {
        try {
          const resp = await fetch(url, { headers: { 'Accept': 'application/json' } });
          if (resp.ok) {
            const json = await resp.json();
            if (Array.isArray(json) && json.length) { results = json; break; }
          }
        } catch {}
      }
      // Fallback: Photon (Komoot) geocoder
      if (!results.length) {
        try {
          const photon = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=1`, { headers: { 'Accept': 'application/json' } });
          if (photon.ok) {
            const pj = await photon.json();
            const feat = pj?.features?.[0];
            if (feat?.geometry?.coordinates?.length >= 2) {
              const [lon, lat] = feat.geometry.coordinates;
              results = [{ lat, lon }];
            }
          }
        } catch {}
      }
      if (!results.length) throw new Error('No results found for that location.');
      const { lat, lon } = results[0];
      setCoords({ lat: Number(lat).toFixed(6), lng: Number(lon).toFixed(6) });
      await fetchNearby(Number(lat), Number(lon));
    } catch (e) {
      setNearbyError(e?.message || 'Failed to find that location.');
    } finally {
      setNearbyLoading(false);
    }
  };

  // (Removed image enrichment and dynamic image fetching for restaurants.)

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
            <Link to="/user/dashboard" className="nav-link active">Home</Link>
            <button type="button" className="nav-link btn-link" onClick={() => ordersRef.current?.scrollIntoView({ behavior: 'smooth'})}>My Orders</button>
            <button type="button" className="nav-link btn-link" onClick={() => popularRef.current?.scrollIntoView({ behavior: 'smooth'})}>Favorites</button>
            <button type="button" className="nav-link btn-link" onClick={() => setShowReels(true)}>Reels</button>
          </nav>
          <div className="user-menu">
            <div className="user-avatar" title={user?.fullName || user?.email || 'Guest'}>{initials}</div>
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
          <Link to="/user/dashboard" className="mobile-drawer-link" onClick={() => setMobileOpen(false)}>🏠 Home</Link>
          <button className="mobile-drawer-btn" onClick={() => { setMobileOpen(false); ordersRef.current?.scrollIntoView({ behavior:'smooth'}); }}>🧾 My Orders</button>
          <button className="mobile-drawer-btn" onClick={() => { setMobileOpen(false); popularRef.current?.scrollIntoView({ behavior:'smooth'}); }}>⭐ Favorites</button>
          <button className="mobile-drawer-btn" onClick={() => { setMobileOpen(false); setShowReels(true); }}>🎞️ Reels</button>
          <div className="mobile-drawer-sep" />
          <button className="mobile-drawer-btn mobile-logout" onClick={() => { setMobileOpen(false); handleLogout(); }}>🚪 Logout</button>
        </nav>
        <div className="mobile-drawer-footer" />
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Hero Banner */}
        <section
          className="hero-banner"
          style={{
            backgroundImage: 'url("https://loremflickr.com/1600/600/food,restaurant?lock=101")',
          }}
          aria-label="Welcome banner"
        >
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title">What would you like to eat?</h1>
            <p className="hero-typer" aria-live="polite">
              <span className="typewriter-text">{displayText}</span>
              <span className="typewriter-caret">|</span>
            </p>
          </div>
        </section>

        {/* Removed legacy search bar (previous static UI) */}

        

        {/* Explore Dishes & Cuisines (TheMealDB) */}
        <div className="section-header" style={{ marginTop: 'var(--spacing-2xl)' }} ref={popularRef}>
          <h2 className="section-title" style={{ fontSize: 'var(--font-size-3xl)' }}>Explore Dishes & Cuisines</h2>
          {/* <p className="section-subtitle">Powered by TheMealDB</p> */}
        </div>

  <div className="stats-grid">
          <div className="card feature-card" style={{ padding: 0 }}>
            <div className="card-content">
              <h3 className="card-title">🔎 Search Dishes</h3>
              <p className="card-subtitle">Search meals by name (e.g., pizza, biryani)</p>
              <div className="input-group" style={{ marginTop: '12px' }}>
                <input
                  className="form-input"
                  placeholder="Type a dish name"
                  value={mealQuery}
                  onChange={(e) => setMealQuery(e.target.value)}
                />
                <button className="btn btn-primary" onClick={searchMeals} disabled={mealLoading || !mealQuery.trim()}>Search</button>
              </div>
            </div>
          </div>

          <div className="card feature-card" style={{ padding: 0 }}>
            <div className="card-content">
              <h3 className="card-title">🍽️ Browse by Cuisine</h3>
              <p className="card-subtitle">Pick a cuisine (area) to see meals</p>
              <div className="input-group" style={{ marginTop: '12px' }}>
                <select className="form-input" value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                  <option value="">Select cuisine</option>
                  {mealAreas.map((a) => (
                    <option key={a.strArea} value={a.strArea}>{a.strArea}</option>
                  ))}
                </select>
                <button className="btn btn-primary" onClick={loadMealsByArea} disabled={mealLoading || !selectedArea}>Load</button>
              </div>
            </div>
          </div>
        </div>

        {mealError && (
          <div className="alert alert-error" style={{ marginBottom: '16px' }}>{mealError}</div>
        )}

        {mealLoading && (
          <div className="empty-state"><div className="empty-icon">⏳</div><h3 className="empty-title">Loading...</h3></div>
        )}

        {selectedMeal && !mealLoading && (
          <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <div className="card-content">
              <h3 className="card-title">{selectedMeal.strMeal}</h3>
              <p className="card-subtitle">{selectedMeal.strArea} • {selectedMeal.strCategory}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '16px', alignItems: 'start', marginTop: '12px' }}>
                <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} style={{ width: '100%', borderRadius: '12px' }} />
                <div>
                  <div className="section-subtitle" style={{ marginBottom: '8px' }}>Ingredients</div>
                  <ul style={{ columns: 2, paddingLeft: '18px' }}>
                    {Array.from({ length: 20 }).map((_, i) => {
                      const ing = selectedMeal[`strIngredient${i+1}`];
                      const meas = selectedMeal[`strMeasure${i+1}`];
                      return ing ? <li key={i}>{ing}{meas ? ` - ${meas}` : ''}</li> : null;
                    })}
                  </ul>
                  {selectedMeal.strSource && (
                    <a href={selectedMeal.strSource} className="auth-link" target="_blank" rel="noreferrer">View Source</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!!mealResults.length && !mealLoading && (
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div className="card-grid">
              {mealResults.slice(0, mealVisible).map((m) => (
                <div key={m.idMeal} className="card" onClick={() => viewMealDetails(m.idMeal)} style={{ cursor: 'pointer' }}>
                  <div className="card-image" style={{ backgroundImage: `url("${m.strMealThumb}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div className="card-content">
                    <h3 className="card-title">{m.strMeal}</h3>
                    {m.strArea && <p className="card-subtitle">{m.strArea}</p>}
                  </div>
                </div>
              ))}
            </div>
            {mealVisible < mealResults.length && (
              <div style={{ display:'flex', justifyContent:'center', marginTop: 'var(--spacing-lg)' }}>
                <button className="btn btn-secondary" onClick={() => setMealVisible(v => v + 9)}>Load More</button>
              </div>
            )}
          </div>
        )}

        {/* Removed legacy Popular Restaurants (static) section */}

        {/* Restaurants near you (OpenStreetMap) */}
        <div className="section-header" style={{ marginTop: 'var(--spacing-3xl)' }}>
          <h2 className="section-title" style={{ fontSize: 'var(--font-size-3xl)' }}>Restaurants Near You</h2>
          {/* <p className="section-subtitle">Powered by OpenStreetMap Overpass</p> */}
        </div>

  <div className="stats-grid">
          <div className="card feature-card" style={{ padding: 0 }}>
            <div className="card-content">
              <h3 className="card-title">📍 Use My Location</h3>
              <p className="card-subtitle">Find restaurants within 7km</p>
              <button className="btn btn-primary" style={{ marginTop: '12px' }} onClick={useMyLocation} disabled={nearbyLoading}>Locate & Search</button>
            </div>
          </div>
          <div className="card feature-card" style={{ padding: 0 }}>
            <div className="card-content">
              <h3 className="card-title">🏙️ Search by City or Address</h3>
              <p className="card-subtitle">Type a city name or local address</p>
              <div className="input-group" style={{ marginTop: '12px' }}>
                <input
                  className="form-input"
                  placeholder="e.g., Bengaluru, MG Road"
                  value={addressQuery}
                  onChange={(e) => setAddressQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') geocodeAndSearch(); }}
                />
                <button className="btn btn-primary" onClick={geocodeAndSearch} disabled={nearbyLoading || !addressQuery.trim()}>Search</button>
              </div>
            </div>
          </div>
        </div>

        {nearbyError && (
          <div className="alert alert-error" style={{ marginBottom: '16px' }}>{nearbyError}</div>
        )}
        {nearbyLoading && (
          <div className="empty-state"><div className="empty-icon">⏳</div><h3 className="empty-title">Loading nearby restaurants...</h3></div>
        )}

        {!!nearby.length && !nearbyLoading && (
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div className="card-grid">
              {nearby.slice(0, nearbyVisible).map((n) => {
                const name = n.tags?.name || 'Unnamed restaurant';
                const cuisine = n.tags?.cuisine || 'Cuisine unavailable';
                const website = n.tags?.website || n.tags?.url || n.tags?.['contact:website'];
                const lat = n.lat; const lon = n.lon;
                const userLat = coords.lat ? Number(coords.lat) : null;
                const userLon = coords.lng ? Number(coords.lng) : null;
                const dist = userLat != null && userLon != null && lat && lon ? distanceKm(userLat, userLon, lat, lon) : null;
                const distText = dist != null ? `${dist.toFixed(1)} km away` : 'Within 7km';
                const osmMap = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`;
                const query = encodeURIComponent(name);
                const zomato = `https://www.zomato.com/search?query=${query}`;
                const swiggy = `https://www.swiggy.com/search?query=${query}`;
                const gmaps = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
                const cuisines = typeof cuisine === 'string' ? cuisine.split(';').map(c => c.trim()).filter(Boolean) : [];
                const seedImg = Math.abs(Number(n.id)) || Date.now();
                const foodImg = `https://loremflickr.com/600/360/food?lock=${seedImg}`;
                return (
                  <div key={`${n.type}-${n.id}`} className="card">
                    <div className="card-image" style={{ backgroundImage: `url("${foodImg}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div className="card-content">
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', gap: 12 }}>
                        <div>
                          <h3 className="card-title" style={{ marginBottom: 4 }}>{name}</h3>
                          {cuisines.length ? (
                            <div className="tags-row">
                              {cuisines.slice(0,3).map((c, i) => (
                                <span key={i} className="badge primary">{c}</span>
                              ))}
                              {cuisines.length > 3 && <span className="badge">+{cuisines.length-3}</span>}
                            </div>
                          ) : (
                            <p className="card-subtitle" style={{ marginBottom: 8 }}>{cuisine}</p>
                          )}
                          <div className="badge info" style={{ marginTop: 8 }}>{distText}</div>
                        </div>
                      </div>
                      <div className="card-actions">
                        {website && (
                          <a className="btn btn-primary btn-sm" href={website} target="_blank" rel="noreferrer">Website</a>
                        )}
                        <a className="btn btn-secondary btn-sm" href={zomato} target="_blank" rel="noreferrer">Order on Zomato</a>
                        <a className="btn btn-secondary btn-sm" href={swiggy} target="_blank" rel="noreferrer">Order on Swiggy</a>
                        <a className="btn btn-outline btn-sm" href={gmaps} target="_blank" rel="noreferrer">Directions</a>
                        <a className="btn btn-outline btn-sm" href={osmMap} target="_blank" rel="noreferrer">OSM Map</a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {nearbyVisible < nearby.length && (
              <div style={{ display:'flex', justifyContent:'center', marginTop: 'var(--spacing-lg)' }}>
                <button className="btn btn-secondary" onClick={() => setNearbyVisible(v => v + 9)}>Load More</button>
              </div>
            )}
          </div>
        )}

        {/* Quick Stats (moved below Restaurant Finder) */}
        <div className="stats-grid" style={{ marginTop: 'var(--spacing-2xl)' }}>
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

        {/* Recent Orders */}
        <div className="section-header" style={{ marginTop: 'var(--spacing-3xl)' }} ref={ordersRef}>
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
      {showReels && (
        <ReelsModal onClose={() => setShowReels(false)} />
      )}
    </div>
  );
};

export default UserDashboard;
