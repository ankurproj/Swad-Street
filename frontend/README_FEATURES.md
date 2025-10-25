# Zomato Clone - Frontend Documentation

## 🎯 Project Overview
A production-level food delivery platform UI with separate user and partner experiences.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx                    # Landing/Home page
│   │   ├── LoginUser.jsx               # User login
│   │   ├── RegisterUser.jsx            # User registration
│   │   ├── LoginPartner.jsx            # Partner login
│   │   ├── RegisterPartner.jsx         # Partner registration
│   │   ├── UserDashboard.jsx           # User dashboard
│   │   └── PartnerDashboard.jsx        # Partner dashboard
│   ├── styles/
│   │   ├── variables.css               # CSS variables & theme
│   │   ├── auth.css                    # Authentication pages styles
│   │   ├── dashboard.css               # Dashboard styles
│   │   └── landing.css                 # Landing page styles
│   ├── routes/
│   │   └── AppRoutes.jsx               # Route configuration
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 🚀 Features

### Landing Page (/)
- **Hero Section**: Eye-catching hero with CTAs for both users and partners
- **Features Showcase**: 6 key features with icons and descriptions
- **How It Works**: 3-step process explanation
- **For Restaurants**: Dedicated section for partner benefits
- **Call-to-Action**: Conversion-focused CTA section
- **Footer**: Comprehensive footer with links

### Authentication Pages
- **Role Switcher**: Toggle between User and Partner on all auth pages
- **Seamless Navigation**: Links between login/register pages
- **Modern Design**: Gradient accents, smooth animations
- **Form Validation**: Required fields (ready for backend integration)
- **Auto-redirect**: Navigate to respective dashboards after login

### User Dashboard (/user/dashboard)
- **Search Bar**: Search for restaurants, cuisines, dishes
- **Quick Stats**: Orders, restaurants, favorites, savings
- **Restaurant Grid**: Browse popular restaurants with ratings
- **Order History**: Recent orders table with status
- **Header Navigation**: Quick access to orders and favorites

### Partner Dashboard (/food-partner/dashboard)
- **Business Stats**: Orders, revenue, prep time, ratings
- **Order Management**: Today's orders with status tracking
- **Menu Management**: Display and manage menu items
- **Quick Actions**: Add items, analytics, settings, reviews
- **Professional Layout**: Optimized for restaurant operations

## 🎨 Design System

### Theme
- **Light/Dark Mode**: Automatic system preference detection
- **CSS Variables**: Centralized theme configuration
- **Color Palette**:
  - Primary: #e23744 (Zomato red)
  - Success: #10b981
  - Warning: #f59e0b
  - Info: #3b82f6

### Typography
- **Font**: System font stack (optimized for all platforms)
- **Sizes**: Responsive scale from xs to 4xl
- **Weights**: 400, 500, 600, 700

### Components
- **Buttons**: Primary, secondary, outline variants
- **Cards**: Hover effects, shadows, borders
- **Forms**: Modern inputs with focus states
- **Tables**: Striped rows, hover effects
- **Badges**: Status indicators

## 🛣️ Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page |
| `/user/login` | LoginUser | User login |
| `/user/register` | RegisterUser | User registration |
| `/user/dashboard` | UserDashboard | User main page |
| `/food-partner/login` | LoginPartner | Partner login |
| `/food-partner/register` | RegisterPartner | Partner registration |
| `/food-partner/dashboard` | PartnerDashboard | Partner main page |

## 📱 Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Breakpoints**:
  - Mobile: < 480px
  - Tablet: 768px
  - Desktop: 1280px

## 🎭 Animations
- **Page Load**: Slide-up, fade-in effects
- **Hover States**: Transform, shadow transitions
- **Button Ripple**: Click effect on primary buttons
- **Float Animation**: Hero emojis floating effect

## 🔧 Tech Stack
- **React 19**: Latest React version
- **React Router DOM 7**: Client-side routing
- **CSS3**: Modern CSS with variables
- **Vite**: Build tool and dev server

## 🚦 Getting Started

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm run dev
```
Opens on http://localhost:5173 (or next available port)

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎯 Navigation Flow

### For Users:
1. Home → Click "Order Now" or "Get Started"
2. Register/Login → Complete form → Click Submit
3. User Dashboard → Browse restaurants → View orders

### For Partners:
1. Home → Click "Partner With Us"
2. Register/Login → Complete form → Click Submit
3. Partner Dashboard → Manage orders → Update menu

### Role Switching:
- On any auth page, click role switcher to toggle between User/Partner
- Maintains context (login/register page)

## 🎨 Customization

### Colors
Edit `src/styles/variables.css`:
```css
--accent-primary: #e23744;  /* Your brand color */
--accent-hover: #c72a36;    /* Hover state */
```

### Layout
```css
--max-width-content: 1280px;  /* Max content width */
--header-height: 64px;        /* Header height */
```

## 📊 Sample Data

All dashboards use sample/mock data. To integrate backend:
1. Replace sample data arrays with API calls
2. Add loading states
3. Implement error handling
4. Add data fetching hooks

## ✨ Production Ready Features
- ✅ Semantic HTML
- ✅ Accessible forms and navigation
- ✅ SEO-friendly structure
- ✅ Performance optimized
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Clean code structure
- ✅ No console errors

## 🔜 Future Enhancements
- Add authentication state management
- Integrate with backend API
- Add real-time order tracking
- Implement payment gateway
- Add image uploads for menu items
- Add customer reviews and ratings
- Add map integration for delivery
- Add notifications system

## 📄 License
MIT

---
Made with ❤️ for food lovers
