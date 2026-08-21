
import { LayoutDashboard as DashboardIcon, LogOut as LogOutIcon, List as ListIcon, X as CloseIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function Sidebar({ onLogout, isOpen, setIsOpen }) {
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    toast.success('Successfully logged out');
    onLogout();
  };
  return (
    <>
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="/logo.png" alt="Levante Logo" style={{ width: '150px', objectFit: 'contain' }} />
          <button className="mobile-close-btn" onClick={() => setIsOpen(false)}>
            <CloseIcon size={24} />
          </button>
        </div>
      <nav className="sidebar-nav">
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
          <DashboardIcon size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/bookings" className={`nav-item ${location.pathname.startsWith('/bookings') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
          <ListIcon size={20} />
          <span>Bookings</span>
        </Link>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogoutClick}>
          <LogOutIcon size={20} />
          <span>Logout</span>
        </button>
      </div>

      {showLogoutModal && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999
        }}>
          <div style={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
            padding: '32px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)',
            width: '100%',
            maxWidth: '400px',
            color: 'white',
            backdropFilter: 'blur(16px)'
          }}>
            <h4 style={{ marginBottom: '12px', fontSize: '1.25rem', color: 'var(--secondary-color)', fontFamily: 'var(--font-serif)' }}>Confirm Logout</h4>
            <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>Are you sure you want to sign out?</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowLogoutModal(false)}
                style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
              >
                Cancel
              </button>
              <button 
                onClick={confirmLogout}
                style={{ padding: '10px 20px', background: 'var(--danger)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '500' }}
                onMouseOver={(e) => e.target.style.opacity = '0.9'}
                onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                Logout
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
      </aside>
    </>
  );
}
