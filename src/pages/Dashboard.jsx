import { useState, useEffect } from 'react';
import { IndianRupee, Users, Calendar, CheckCircle, FileText, XCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/bookings");
      const data = await res.json();
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Stats calculation
  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED');
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyBookings = bookings.filter(b => {
    const d = new Date(b.createdAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
  const pendingRequests = bookings.filter(b => b.status === 'PENDING').length;
  const cancelledBookings = bookings.filter(b => b.status === 'CANCELLED').length;
  const totalGuests = confirmedBookings.reduce((sum, b) => sum + (parseInt(b.guests) || 0), 0);

  const upcomingEvents = confirmedBookings
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const recentRequests = bookings
    .filter(b => b.status === 'PENDING')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon secondary"><IndianRupee size={24} /></div>
          <div className="stat-info">
            <h3>Confirmed Revenue</h3>
            <p>₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon primary"><FileText size={24} /></div>
          <div className="stat-info">
            <h3>Total Bookings</h3>
            <p>{bookings.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success"><CheckCircle size={24} /></div>
          <div className="stat-info">
            <h3>This Month</h3>
            <p>{monthlyBookings.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning"><Calendar size={24} /></div>
          <div className="stat-info">
            <h3>Pending Requests</h3>
            <p>{pendingRequests}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon primary"><Users size={24} /></div>
          <div className="stat-info">
            <h3>Total Guests</h3>
            <p>{totalGuests}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon danger"><XCircle size={24} /></div>
          <div className="stat-info">
            <h3>Cancelled</h3>
            <p>{cancelledBookings}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-widgets">
        <div className="data-card">
          <div className="data-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Upcoming Events</h3>
            <button className="text-btn" onClick={() => navigate('/bookings')}>View All</button>
          </div>
          <div className="activity-list">
            {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
              <div key={event.id} className="activity-item" onClick={() => navigate(`/bookings/${event.id}`)}>
                <div className="activity-info">
                  <h4>{event.name}</h4>
                  <p>{event.event} • {event.guests} Guests</p>
                </div>
                <div className="activity-meta">
                  <div className="date">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  <div className={`status-badge ${event.status}`}>{event.status}</div>
                </div>
              </div>
            )) : <p style={{ color: 'var(--text-secondary)' }}>No upcoming events.</p>}
          </div>
        </div>

        <div className="data-card">
          <div className="data-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Recent Requests</h3>
            <button className="text-btn" onClick={() => navigate('/bookings')}>View All</button>
          </div>
          <div className="activity-list">
            {recentRequests.length > 0 ? recentRequests.map(req => (
              <div key={req.id} className="activity-item" onClick={() => navigate(`/bookings/${req.id}`)}>
                <div className="activity-info">
                  <h4>{req.name}</h4>
                  <p>{req.email}</p>
                </div>
                <div className="activity-meta">
                  <div className="date">{new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  <div className={`status-badge ${req.status}`}>{req.status}</div>
                </div>
              </div>
            )) : <p style={{ color: 'var(--text-secondary)' }}>No pending requests.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
