import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BookingsList from './pages/BookingsList';
import BookingDetails from './pages/BookingDetails';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{
        style: {
          background: 'var(--surface-color)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
        }
      }} />
      {isAuthenticated ? (
        <div className="dashboard-layout">
          <Sidebar onLogout={() => setIsAuthenticated(false)} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <div className="main-content">
            <Topbar toggleSidebar={() => setIsSidebarOpen(true)} />
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/bookings" element={<BookingsList />} />
                <Route path="/bookings/:id" element={<BookingDetails />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
