import { useLocation } from 'react-router-dom';

export default function Topbar() {
  const location = useLocation();
  let title = "Dashboard";
  if (location.pathname === '/bookings') {
    title = "All Bookings";
  } else if (location.pathname.startsWith('/bookings/')) {
    title = "Booking Details";
  }

  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="user-profile">

        <div className="avatar">A</div>
        <span style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)'}}>Admin User</span>
      </div>
    </header>
  );
}
