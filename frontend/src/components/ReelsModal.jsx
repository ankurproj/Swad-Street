import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/reels.css';

const reelsData = [
  {
    id: 1,
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'Hot and fresh Margherita pizza straight from the oven! 🍕🔥',
    restaurant: 'Pizza Paradise',
  },
  {
    id: 2,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'Juicy burgers stacked with double cheese! 🍔🧀',
    restaurant: 'Burger Bros',
  },
  {
    id: 3,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Sushi rolls made to perfection. 🍣👌',
    restaurant: 'Sushi Station',
  },
];

export default function ReelsModal({ onClose }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const vidsRef = useRef([]);
  const [liked, setLiked] = useState(() => new Set());
  const [saved, setSaved] = useState(() => new Set());

  const items = useMemo(() => reelsData, []);

  useEffect(() => {
    // Prevent background scroll when modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const vids = vidsRef.current;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting) {
            // Auto play muted to avoid browser block
            video.muted = true;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { root: containerRef.current, threshold: 0.6 }
    );

    vids.forEach(v => v && observer.observe(v));
    return () => {
      vids.forEach(v => v && observer.unobserve(v));
      observer.disconnect();
      document.body.style.overflow = prev;
    };
  }, []);

  const handleOrder = (restaurantName) => {
    // In a real app, you would deep-link to the restaurant or open an order sheet.
    navigate('/user/orders');
  };

  const toggleLike = (id) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSave = (id) => {
    setSaved(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="reels-overlay" role="dialog" aria-modal="true">
      <div className="reels-shell">
        <button className="reels-close" aria-label="Close" onClick={onClose}>✕</button>
        <div className="reels-frame">
          <div className="reels-viewport" ref={containerRef}>
            {items.map((item, idx) => (
              <section key={item.id} className="reel-slide">
                <video
                  ref={el => (vidsRef.current[idx] = el)}
                  className="reel-video"
                  src={item.src}
                  playsInline
                  loop
                  preload="metadata"
                  // don't set autoPlay to avoid autoplay policies; we play via IntersectionObserver
                  controls={false}
                />

                <div className="reel-gradient" />

                {/* Right vertical actions rail */}
                <div className="reel-rail" aria-label="Reel actions">
                  <button
                    className={`reel-icon-btn ${liked.has(item.id) ? 'active like' : ''}`}
                    title={liked.has(item.id) ? 'Unlike' : 'Like'}
                    aria-pressed={liked.has(item.id)}
                    onClick={() => toggleLike(item.id)}
                  >
                    {liked.has(item.id) ? <HeartFilledIcon/> : <HeartIcon/>}
                  </button>
                  <button
                    className="reel-icon-btn"
                    title="Comment"
                    onClick={() => {/* open comment UI in future */}}
                  >
                    <CommentIcon/>
                  </button>
                  <button
                    className={`reel-icon-btn ${saved.has(item.id) ? 'active save' : ''}`}
                    title={saved.has(item.id) ? 'Saved' : 'Save to favorites'}
                    aria-pressed={saved.has(item.id)}
                    onClick={() => toggleSave(item.id)}
                  >
                    {saved.has(item.id) ? <BookmarkFilledIcon/> : <BookmarkIcon/>}
                  </button>
                </div>

                {/* Bottom-left meta and order */}
                <div className="reel-meta">
                  <div className="reel-desc">
                    <h3 className="reel-restaurant">{item.restaurant}</h3>
                    <p className="reel-text">{item.description}</p>
                  </div>
                  <div>
                    <button className="reel-btn order" title="Order" onClick={() => handleOrder(item.restaurant)}>Order Now</button>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal inline SVG icons to mimic modern app icons
function HeartIcon(){
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M19.5 4.5c-1.9-1.7-4.9-1.4-6.5.7-1.6-2.1-4.6-2.4-6.5-.7-2.2 2-2.3 5.4-.3 7.6l6.3 6.4c.3.3.9.3 1.2 0l6.3-6.4c2-2.2 1.9-5.6-.5-7.6Z" stroke="currentColor" strokeWidth="1.7" fill="none"/>
    </svg>
  );
}
function HeartFilledIcon(){
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M19.5 4.5c-1.9-1.7-4.9-1.4-6.5.7-1.6-2.1-4.6-2.4-6.5-.7-2.2 2-2.3 5.4-.3 7.6l6.3 6.4c.3.3.9.3 1.2 0l6.3-6.4c2-2.2 1.9-5.6-.5-7.6Z"/>
    </svg>
  );
}
function CommentIcon(){
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M20 12c0 3.3-3.6 6-8 6-.8 0-1.6-.1-2.3-.3L4 19l1.5-3.2C4.6 14.9 4 13.5 4 12c0-3.3 3.6-6 8-6s8 2.7 8 6Z" stroke="currentColor" strokeWidth="1.7" fill="none"/>
    </svg>
  );
}
function BookmarkIcon(){
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M7 3h10a1 1 0 0 1 1 1v16l-6-3.5L6 20V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" fill="none"/>
    </svg>
  );
}
function BookmarkFilledIcon(){
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M7 3h10a1 1 0 0 1 1 1v16l-6-3.5L6 20V4a1 1 0 0 1 1-1Z"/>
    </svg>
  );
}
