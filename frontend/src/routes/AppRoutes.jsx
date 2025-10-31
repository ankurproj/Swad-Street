import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import RegisterUser from '../pages/RegisterUser';
import LoginUser from '../pages/LoginUser';
import RegisterPartner from '../pages/RegisterPartner';
import LoginPartner from '../pages/LoginPartner';
import UserDashboard from '../pages/UserDashboard';
import PartnerDashboard from '../pages/PartnerDashboard';
import PartnerOrders from '../pages/PartnerOrders';
import PartnerMenu from '../pages/PartnerMenu';
import PartnerAnalytics from '../pages/PartnerAnalytics';
import Modal from '../components/Modal';

function RoutesWithModals(){
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state && state.backgroundLocation;

  const NavigateBackModal = ({ children }) => {
    const navigate = useNavigate();
    const handleClose = () => {
      if (backgroundLocation) {
        // Jump directly back to the original background page in one go
        const target = `${backgroundLocation.pathname || '/'}${backgroundLocation.search || ''}${backgroundLocation.hash || ''}`;
        navigate(target, { replace: true });
      } else {
        // Fallback if opened directly (no history/backdrop available)
        navigate('/', { replace: true });
      }
    };
    return (
      <Modal isOpen onClose={handleClose}>
        {/* Add a wrapper to ensure no header/footer appear */}
        <div className="modal-hide-chrome">{children}</div>
      </Modal>
    );
  };

  return (
    <>
      <Routes location={backgroundLocation || location}>
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
        <Route path="/food-partner/orders" element={<PartnerOrders />} />
        <Route path="/food-partner/menu" element={<PartnerMenu />} />
        <Route path="/food-partner/analytics" element={<PartnerAnalytics />} />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/user/register" element={<NavigateBackModal><RegisterUser /></NavigateBackModal>} />
          <Route path="/user/login" element={<NavigateBackModal><LoginUser /></NavigateBackModal>} />
          <Route path="/food-partner/register" element={<NavigateBackModal><RegisterPartner /></NavigateBackModal>} />
          <Route path="/food-partner/login" element={<NavigateBackModal><LoginPartner /></NavigateBackModal>} />
        </Routes>
      )}
    </>
  );
}

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <RoutesWithModals />
      </Router>
    </div>
  )
}

export default AppRoutes
