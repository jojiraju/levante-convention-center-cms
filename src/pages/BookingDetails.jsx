import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/bookings/${id}`);
      const data = await res.json();
      setBooking(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ color: 'var(--text-primary)' }}>Loading...</div>;
  if (!booking) return <div style={{ color: 'var(--text-primary)' }}>Booking not found</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
        <button 
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>Booking Details</h2>
      </div>

      <div className="data-card" style={{ maxWidth: '800px' }}>
        <div className="data-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>{booking.name}'s Event</h3>
          <span className={`status-badge ${booking.status}`}>{booking.status}</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', color: 'var(--text-primary)', marginTop: '24px' }}>
          <div>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '12px', fontSize: '1.1rem' }}>Client Info</h4>
            <p style={{ marginBottom: '8px' }}><strong>Name:</strong> {booking.name}</p>
            <p style={{ marginBottom: '8px' }}><strong>Email:</strong> {booking.email}</p>
            <p style={{ marginBottom: '8px' }}><strong>Phone:</strong> {booking.phone}</p>
            <p style={{ marginBottom: '8px' }}><strong>Address:</strong> {booking.address}</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '12px', fontSize: '1.1rem' }}>Event Details</h4>
            <p style={{ marginBottom: '8px' }}><strong>Event:</strong> {booking.event}</p>
            <p style={{ marginBottom: '8px' }}><strong>Date:</strong> {booking.date}</p>
            <p style={{ marginBottom: '8px' }}><strong>Time:</strong> {booking.time}</p>
            <p style={{ marginBottom: '8px' }}><strong>Guests:</strong> {booking.guests}</p>
          </div>
          <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--border-color)', paddingTop: '24px', marginTop: '12px' }}>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '12px', fontSize: '1.1rem' }}>Financials</h4>
            <p style={{ marginBottom: '8px' }}><strong>AC Hours:</strong> {booking.acHours} hr</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '16px', color: 'var(--text-primary)' }}>
              Total Amount: <span style={{ color: 'var(--secondary-color)' }}>₹{booking.totalAmount?.toLocaleString('en-IN')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
