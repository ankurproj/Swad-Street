import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import RegisterUser from '../pages/RegisterUser';
import LoginUser from '../pages/LoginUser';
import RegisterPartner from '../pages/RegisterPartner';
import LoginPartner from '../pages/LoginPartner';
import UserDashboard from '../pages/UserDashboard';
import PartnerDashboard from '../pages/PartnerDashboard';

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
            {/* Home/Landing Page */}
            <Route path="/" element={<Home />} />
            
            {/* User Routes */}
            <Route path="/user/register" element={<RegisterUser />}/>
            <Route path="/user/login" element={<LoginUser />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            
            {/* Partner Routes */}
            <Route path="/food-partner/register" element={<RegisterPartner />} />
            <Route path="/food-partner/login" element={<LoginPartner />} />
            <Route path="/food-partner/dashboard" element={<PartnerDashboard />} />
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default AppRoutes
