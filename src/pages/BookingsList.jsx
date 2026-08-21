import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import toast from 'react-hot-toast';
import { Search, Filter, Inbox } from 'lucide-react';

export default function BookingsList() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    if (!confirm(`Are you sure you want to mark this as ${newStatus}?`)) return;
    const loadingToast = toast.loading('Updating status...');
    try {
      const res = await fetch(`http://localhost:4000/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success(`Booking marked as ${newStatus}`, { id: loadingToast });
        fetchBookings();
      } else {
        toast.error('Failed to update status', { id: loadingToast });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating status', { id: loadingToast });
    }
  };

  const columns = [
    {
      name: 'Client Details',
      selector: row => row.name,
      sortable: true,
      cell: row => (
        <div>
          <div style={{fontWeight: 600, color: 'var(--text-primary)'}}>{row.name}</div>
          <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>{row.email}</div>
          <div style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4}}>
            Req: {new Date(row.createdAt).toLocaleDateString()}
          </div>
        </div>
      )
    },
    {
      name: 'Event Info',
      selector: row => row.event,
      sortable: true,
      cell: row => (
        <div>
          <div style={{fontWeight: 500}}>{row.event}</div>
          <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>Date: {row.date}</div>
          <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>Guests: {row.guests}</div>
        </div>
      )
    },
    {
      name: 'Financials',
      selector: row => row.totalAmount,
      sortable: true,
      cell: row => (
        <div>
          <div style={{fontWeight: 600, color: 'var(--secondary-color)'}}>₹{row.totalAmount.toLocaleString('en-IN')}</div>
          <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>AC Add-on: {row.acHours} hr</div>
        </div>
      )
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span className={`status-badge ${row.status}`}>
          {row.status}
        </span>
      )
    },
    {
      name: 'Actions',
      cell: row => (
        <div style={{display: 'flex'}}>
          <button className="action-btn" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', marginRight: '8px'}} onClick={() => navigate(`/bookings/${row.id}`)}>View</button>
          {row.status === 'PENDING' && (
            <>
              <button className="action-btn confirm" onClick={() => updateStatus(row.id, 'CONFIRMED')}>Confirm</button>
              <button className="action-btn cancel" onClick={() => updateStatus(row.id, 'CANCELLED')}>Cancel</button>
            </>
          )}
          {row.status === 'CONFIRMED' && (
            <button className="action-btn cancel" onClick={() => updateStatus(row.id, 'CANCELLED')}>Cancel</button>
          )}
          {row.status === 'CANCELLED' && (
            <button className="action-btn confirm" onClick={() => updateStatus(row.id, 'CONFIRMED')}>Confirm</button>
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '200px'
    }
  ];

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const EmptyState = () => (
    <div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <Inbox size={40} style={{ opacity: 0.7, color: 'var(--secondary-color)' }} />
      </div>
      <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>No Bookings Found</h4>
      <p style={{ fontSize: '0.95rem' }}>There are no booking records matching your current criteria.</p>
    </div>
  );

  const customStyles = {
    table: {
      style: {
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
      },
    },
    headRow: {
      style: {
        backgroundColor: 'transparent',
        borderBottom: '1px solid var(--border-color)',
      },
    },
    headCells: {
      style: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: 'var(--secondary-color)', /* Make header text pop more with gold */
        padding: '16px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      },
    },
    cells: {
      style: {
        padding: '16px',
        fontSize: '0.9rem',
        color: 'var(--text-primary)',
        backgroundColor: 'transparent',
      },
    },
    rows: {
      style: {
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
        '&:not(:last-of-type)': {
          borderBottom: '1px solid var(--border-color)',
        },
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      },
    },
    pagination: {
      style: {
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
        borderTop: '1px solid var(--border-color)',
      }
    },
    noData: {
      style: {
        backgroundColor: 'transparent',
        color: 'var(--text-secondary)',
        padding: '48px 24px',
        fontSize: '1rem',
      }
    }
  };

  return (
    <div className="data-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px 16px 12px 48px', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)', 
              background: 'rgba(255,255,255,0.05)', 
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Filter size={18} style={{ color: 'var(--text-secondary)' }} />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'rgba(10, 17, 40, 0.8)', // Solid background for select dropdown to be visible
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>
      
      <DataTable
        columns={columns}
        data={filteredBookings}
        progressPending={loading}
        pagination
        customStyles={customStyles}
        highlightOnHover
        noDataComponent={<EmptyState />}

      />
    </div>
  );
}
