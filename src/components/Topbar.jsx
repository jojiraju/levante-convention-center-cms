import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Topbar({ toggleSidebar }) {
  const location = useLocation();
  let title = "Dashboard";
  if (location.pathname === '/bookings') {
    title = "All Bookings";
  } else if (location.pathname.startsWith('/bookings/')) {
    title = "Booking Details";
  }

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="topbar-title">{title}</div>
      </div>
      <div className="user-profile">

        <div className="avatar">A</div>
        <span style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)'}}>Admin User</span>
      </div>
    </header>
  );
}
